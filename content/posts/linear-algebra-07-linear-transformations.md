---
title: 线性变换：保持加法与缩放的函数
description: 从函数视角定义线性变换，认识核、像、秩与零度之间的联系。
date: 2026-07-13
category: 线性代数
tags:
  - 数学
  - 线性变换
  - 秩
draft: false
pinned: false
banner: false
---

## 线性究竟指什么

从向量空间 $V$ 到 $W$ 的函数 $T$ 若满足

$$
T(a\boldsymbol{u}+b\boldsymbol{v})
=aT(\boldsymbol{u})+bT(\boldsymbol{v})
$$

就称为线性变换。它保持向量加法与标量乘法，因此也一定把零向量映射到零向量。

平面旋转、沿坐标轴缩放、关于过原点直线的镜像都是线性变换。平移通常不是，因为 $T(\boldsymbol{0})\ne\boldsymbol{0}$。

## 只需知道基向量的去向

任意向量都能由一组基线性表示，而线性变换保持线性组合。因此，只要知道每个基向量被送到哪里，就能确定整个变换。

在标准基下，把这些输出向量依次放进列中，就得到变换的矩阵：

$$
A=\begin{bmatrix}|&|\\T(\boldsymbol{e}_1)&T(\boldsymbol{e}_2)\\|&|\end{bmatrix}
$$

## 核与像

核是被映射为零的全部输入：

$$
\ker(T)=\{\boldsymbol{x}\mid T(\boldsymbol{x})=\boldsymbol{0}\}
$$

像则是所有可能输出的集合。核反映变换丢失的信息，像反映变换能够覆盖的范围。

## 秩—零度定理

若定义域有限维，则有

$$
\dim(\ker T)+\dim(\operatorname{im}T)=\dim(V)
$$

矩阵语言中，像的维数就是秩，核的维数叫零度。这个等式像一份“自由度账单”：输入空间的维数，要么保留在输出中，要么消失在核里。

::callout
证明一个函数不是线性变换时，先检查它是否把零向量映射到零；这是最快的反例来源。
::
