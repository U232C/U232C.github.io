---
title: 正交、投影与最小二乘：找不到精确解时怎么办
description: 从内积和正交分解推导投影公式，并解释最小二乘为何得到最接近的近似解。
date: 2026-07-17
category: 线性代数
tags:
  - 数学
  - 正交投影
  - 最小二乘
draft: false
pinned: false
banner: false
---

## 内积测量方向关系

对实向量，标准内积为

$$
\boldsymbol{u}\cdot\boldsymbol{v}=\boldsymbol{u}^T\boldsymbol{v}
$$

若内积为零，两向量正交。向量长度由内积诱导：

$$
\|\boldsymbol{v}\|=\sqrt{\boldsymbol{v}^T\boldsymbol{v}}
$$

正交向量彼此不混合信息；若它们长度还都是 1，就构成标准正交组。

## 投影到一条直线

把向量 $\boldsymbol{b}$ 投影到非零向量 $\boldsymbol{a}$ 张成的直线上：

$$
\operatorname{proj}_{\boldsymbol{a}}\boldsymbol{b}
=\frac{\boldsymbol{a}^T\boldsymbol{b}}{\boldsymbol{a}^T\boldsymbol{a}}\boldsymbol{a}
$$

投影后的误差

$$
\boldsymbol{e}=\boldsymbol{b}-\operatorname{proj}_{\boldsymbol{a}}\boldsymbol{b}
$$

与 $\boldsymbol{a}$ 正交。这正是“最近点”成立的几何原因。

## 从投影到最小二乘

当方程 $A\boldsymbol{x}=\boldsymbol{b}$ 无解时，意味着 $\boldsymbol{b}$ 不在 $A$ 的列空间中。我们转而寻找列空间里离 $\boldsymbol{b}$ 最近的向量 $A\hat{\boldsymbol{x}}$。

最优误差必须与列空间正交，因此

$$
A^T(\boldsymbol{b}-A\hat{\boldsymbol{x}})=\boldsymbol{0}
$$

整理得到正规方程：

$$
A^TA\hat{\boldsymbol{x}}=A^T\boldsymbol{b}
$$

这就是线性回归背后的线性代数结构。

::callout
数值计算中通常使用 QR 分解或 SVD 求最小二乘解，而不是显式计算 $(A^TA)^{-1}$，因为后者可能放大数值误差。
::
