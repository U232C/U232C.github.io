---
title: 梅涅劳斯定理：一条截线与三个线段比
description: 从可拖动的几何图形出发，理解梅涅劳斯定理的有向线段形式，并用仿射坐标给出简洁证明。
date: 2026-08-17
category: 平面几何
tags:
  - 数学
  - 平面几何
  - 梅涅劳斯定理
draft: false
pinned: false
banner: false
---

## 定理说了什么

在三角形 $ABC$ 中，一条不经过顶点的直线分别与直线 $BC$、$CA$、$AB$ 相交于 $D$、$E$、$F$。采用有向线段时，梅涅劳斯定理写成

$$
\frac{\overline{BD}}{\overline{DC}}
\cdot
\frac{\overline{CE}}{\overline{EA}}
\cdot
\frac{\overline{AF}}{\overline{FB}}
=-1.
$$

如果 $D$、$E$ 位于三角形的两条边内部，而 $F$ 位于第三条边的延长线上，那么改用普通长度后，等式右侧就是 $1$：

$$
\frac{BD}{DC}
\cdot
\frac{CE}{EA}
\cdot
\frac{AF}{FB}
=1.
$$

负号并不是额外的几何规律，只是有向线段记录了交点位于延长线上的方向信息。

## 拖动图形观察不变量

拖动 $A$、$B$、$C$ 可以改变三角形，拖动下方滑块可以改变 $D$ 在 $BC$ 上的位置。点 $E$ 始终满足 $CE:EA=4:1$，直线 $DE$ 与 $AB$ 的交点为 $F$。

```js [梅涅劳斯定理：拖动验证] renderer=jsxgraph height=500 bbox=-6,5,6,-4 axis=false grid=false
const pointStyle = {
  size: 4,
  strokeColor: '#1d4ed8',
  fillColor: '#3b82f6',
  highlightStrokeColor: '#1e40af',
  highlightFillColor: '#60a5fa'
}

const A = board.create('point', [-3, -1.5], { name: 'A', ...pointStyle })
const B = board.create('point', [3, -1.5], { name: 'B', ...pointStyle })
const C = board.create('point', [0, 3.4], { name: 'C', ...pointStyle })

board.create('segment', [A, B], { strokeColor: '#64748b', strokeWidth: 2 })
board.create('segment', [B, C], { strokeColor: '#64748b', strokeWidth: 2 })
board.create('segment', [C, A], { strokeColor: '#64748b', strokeWidth: 2 })

const u = board.create('slider', [[-5, -3.1], [0.5, -3.1], [0.3, 0.55, 0.85]], {
  name: 'BD / BC',
  snapWidth: 0.01,
  baseline: { strokeColor: '#94a3b8' },
  highline: { strokeColor: '#2563eb' }
})

const D = board.create('point', [
  () => (1 - u.Value()) * B.X() + u.Value() * C.X(),
  () => (1 - u.Value()) * B.Y() + u.Value() * C.Y()
], { name: 'D', size: 4, strokeColor: '#c2410c', fillColor: '#f97316' })

const v = 0.8
const E = board.create('point', [
  () => (1 - v) * C.X() + v * A.X(),
  () => (1 - v) * C.Y() + v * A.Y()
], { name: 'E', size: 4, strokeColor: '#c2410c', fillColor: '#f97316' })

const lineAB = board.create('line', [A, B], { visible: false })
const transversal = board.create('line', [D, E], {
  strokeColor: '#dc2626',
  strokeWidth: 2,
  dash: 2
})
const F = board.create('intersection', [lineAB, transversal, 0], {
  name: 'F',
  size: 4,
  strokeColor: '#047857',
  fillColor: '#10b981'
})

const ratioBDDC = () => D.Dist(B) / D.Dist(C)
const ratioCEEA = () => E.Dist(C) / E.Dist(A)
const ratioAFFB = () => F.Dist(A) / F.Dist(B)
const product = () => ratioBDDC() * ratioCEEA() * ratioAFFB()
const textColor = getComputedStyle(board.containerObj).color || '#334155'

board.create('text', [0.7, 4.35, () => `BD/DC = ${ratioBDDC().toFixed(3)}`], {
  fontSize: 15,
  color: textColor
})
board.create('text', [0.7, 3.9, () => `CE/EA = ${ratioCEEA().toFixed(3)}`], {
  fontSize: 15,
  color: textColor
})
board.create('text', [0.7, 3.45, () => `AF/FB = ${ratioAFFB().toFixed(3)}`], {
  fontSize: 15,
  color: textColor
})
board.create('text', [0.7, 3, () => `乘积 = ${product().toFixed(6)}`], {
  fontSize: 16,
  color: '#047857',
  cssStyle: 'font-weight: 700'
})
```

无论怎样改变三角形，只要没有把它拖成退化图形，最后一行都会保持在 $1$ 附近。偶尔出现的末位误差来自浏览器中的浮点数计算。

::callout
图形使用的是普通长度，所以显示的乘积为 $1$。若按照边的方向给线段添加正负号，乘积就是 $-1$。
::

## 为什么乘积一定不变

梅涅劳斯定理是一个仿射命题：平移、旋转、缩放甚至斜切都不会改变同一直线上的线段比。因此可以选取方便的仿射坐标

$$
A=\boldsymbol{0},\qquad B=\boldsymbol{b},\qquad C=\boldsymbol{c}.
$$

设 $D$ 从 $B$ 向 $C$ 走过边长的比例为 $u$，$E$ 从 $C$ 向 $A$ 走过边长的比例为 $v$，其中 $0<u,v<1$。于是

$$
D=(1-u)\boldsymbol{b}+u\boldsymbol{c},
\qquad
E=(1-v)\boldsymbol{c},
$$

并且

$$
\frac{BD}{DC}=\frac{u}{1-u},
\qquad
\frac{CE}{EA}=\frac{v}{1-v}.
$$

把直线 $DE$ 上的点写成 $E+s(D-E)$。交点 $F$ 位于直线 $AB$ 上，所以它的 $\boldsymbol{c}$ 分量必须为零。解出参数后可得

$$
F=\frac{(1-u)(1-v)}{1-u-v}\,\boldsymbol{b}.
$$

当图形处于上面的典型位置，即 $u+v>1$ 时，系数为负，说明 $F$ 位于 $A$ 的外侧。取普通长度便有

$$
\frac{AF}{FB}=\frac{(1-u)(1-v)}{uv}.
$$

三个比值相乘，所有因子恰好消去：

$$
\frac{u}{1-u}
\cdot
\frac{v}{1-v}
\cdot
\frac{(1-u)(1-v)}{uv}
=1.
$$

若从一开始使用有向线段，最后一个比值带负号，就得到定理的标准形式。

## 逆定理也很重要

如果 $D$、$E$、$F$ 分别位于三角形三边所在的直线上，并且三个有向线段比的乘积为 $-1$，那么 $D$、$E$、$F$ 共线。这就是梅涅劳斯定理的逆定理。

在几何证明中，正定理常用来从“共线”推出比例关系，逆定理则常用来把一个代数恒等式重新翻译成“共线”。

## 一个自检问题

设 $D$ 是 $BC$ 的中点，$E$ 满足 $CE:EA=2:1$，直线 $DE$ 与 $AB$ 的延长线交于 $F$。由梅涅劳斯定理，

$$
1\cdot 2\cdot\frac{AF}{FB}=1,
$$

因此 $AF:FB=1:2$。试着只用相似三角形重新证明这个结论，并比较两种方法各自需要构造哪些辅助线。
