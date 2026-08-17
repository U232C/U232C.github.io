[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

$certificateSubject = 'CN=U232C Blog Local Development'
$repositoryRoot = Split-Path -Parent $PSScriptRoot
$certificateDirectory = Join-Path $repositoryRoot '.cert'
$certificatePath = Join-Path $certificateDirectory 'local-dev-cert.pem'
$privateKeyPath = Join-Path $certificateDirectory 'local-dev-key.pem'

$dnsNames = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)
$ipAddresses = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)

[void]$dnsNames.Add('localhost')
[void]$dnsNames.Add([System.Environment]::MachineName)
[void]$ipAddresses.Add('127.0.0.1')

Get-NetIPAddress -AddressFamily IPv4 -ErrorAction Stop |
  Where-Object {
    $_.AddressState -eq 'Preferred' -and
    $_.IPAddress -ne '127.0.0.1' -and
    -not $_.IPAddress.StartsWith('169.254.')
  } |
  ForEach-Object { [void]$ipAddresses.Add($_.IPAddress) }

$rsa = [System.Security.Cryptography.RSA]::Create(2048)

try {
  $request = [System.Security.Cryptography.X509Certificates.CertificateRequest]::new(
    $certificateSubject,
    $rsa,
    [System.Security.Cryptography.HashAlgorithmName]::SHA256,
    [System.Security.Cryptography.RSASignaturePadding]::Pkcs1
  )

  $request.CertificateExtensions.Add(
    [System.Security.Cryptography.X509Certificates.X509BasicConstraintsExtension]::new($false, $false, 0, $true)
  )
  $request.CertificateExtensions.Add(
    [System.Security.Cryptography.X509Certificates.X509KeyUsageExtension]::new(
      [System.Security.Cryptography.X509Certificates.X509KeyUsageFlags]::DigitalSignature -bor
      [System.Security.Cryptography.X509Certificates.X509KeyUsageFlags]::KeyEncipherment,
      $true
    )
  )

  $enhancedKeyUsages = [System.Security.Cryptography.OidCollection]::new()
  [void]$enhancedKeyUsages.Add([System.Security.Cryptography.Oid]::new('1.3.6.1.5.5.7.3.1'))
  $request.CertificateExtensions.Add(
    [System.Security.Cryptography.X509Certificates.X509EnhancedKeyUsageExtension]::new($enhancedKeyUsages, $true)
  )

  $subjectAlternativeNames = [System.Security.Cryptography.X509Certificates.SubjectAlternativeNameBuilder]::new()
  foreach ($dnsName in $dnsNames) {
    $subjectAlternativeNames.AddDnsName($dnsName)
  }
  foreach ($ipAddress in $ipAddresses) {
    $subjectAlternativeNames.AddIpAddress([System.Net.IPAddress]::Parse($ipAddress))
  }
  $request.CertificateExtensions.Add($subjectAlternativeNames.Build())

  $certificate = $request.CreateSelfSigned(
    [System.DateTimeOffset]::Now.AddDays(-1),
    [System.DateTimeOffset]::Now.AddDays(365)
  )

  try {
    New-Item -ItemType Directory -Path $certificateDirectory -Force | Out-Null
    [System.IO.File]::WriteAllText($certificatePath, $certificate.ExportCertificatePem())
    [System.IO.File]::WriteAllText($privateKeyPath, $rsa.ExportPkcs8PrivateKeyPem())

    $publicCertificate = [System.Security.Cryptography.X509Certificates.X509Certificate2]::new(
      $certificate.Export([System.Security.Cryptography.X509Certificates.X509ContentType]::Cert)
    )
    $rootStore = [System.Security.Cryptography.X509Certificates.X509Store]::new(
      [System.Security.Cryptography.X509Certificates.StoreName]::Root,
      [System.Security.Cryptography.X509Certificates.StoreLocation]::CurrentUser
    )

    try {
      $rootStore.Open([System.Security.Cryptography.X509Certificates.OpenFlags]::ReadWrite)
      @($rootStore.Certificates | Where-Object { $_.Subject -eq $certificateSubject }) |
        ForEach-Object { $rootStore.Remove($_) }
      $rootStore.Add($publicCertificate)
    }
    finally {
      $rootStore.Close()
      $publicCertificate.Dispose()
    }

    Write-Host '本地 HTTPS 证书已生成并加入当前用户的受信任根证书存储。'
    Write-Host "证书有效地址：$($dnsNames -join ', '), $($ipAddresses -join ', ')"
    Write-Host '现在运行 pnpm dev:https。局域网 IP 变化后请重新运行 pnpm setup:https。'
  }
  finally {
    $certificate.Dispose()
  }
}
finally {
  $rsa.Dispose()
}
