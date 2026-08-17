---
title: 基、维数与坐标：用最少的方向描述空间
description: 串联线性相关、生成集、基和维数，并解释为什么同一向量可以有不同坐标。
date: 2026-07-11
category: 线性代数
tags:
  - 数学
  - 基
  - 维数
draft: false
pinned: false
banner: false
---

## 线性相关意味着信息重复

若存在不全为零的系数，使得

$$
c_1\boldsymbol{v}_1+\cdots+c_k\boldsymbol{v}_k=\boldsymbol{0}
$$

则称这组向量线性相关。这意味着至少一个向量可以由其他向量表示，它没有提供新的方向。

例如 $(1,0)$、$(0,1)$、$(1,1)$ 线性相关，因为第三个向量等于前两个之和。

## 什么是基

空间的一组基必须同时满足：

- 线性无关，没有冗余方向。
- 能够张成整个空间，没有遗漏方向。

$\mathbb{R}^2$ 的标准基是

$$
\boldsymbol{e}_1=\begin{bmatrix}1\\0\end{bmatrix},\qquad
\boldsymbol{e}_2=\begin{bmatrix}0\\1\end{bmatrix}
$$

但标准基并不唯一。$(1,1)$ 与 $(1,-1)$ 同样可以作为一组基。

## 坐标依赖所选的基

向量本身没有改变，但它的坐标会随基变化。设

$$
B=\left\{
\begin{bmatrix}1\\1\end{bmatrix},
\begin{bmatrix}1\\-1\end{bmatrix}
\right\}
$$

则向量 $(4,2)$ 可写成

$$
3\begin{bmatrix}1\\1\end{bmatrix}+
1\begin{bmatrix}1\\-1\end{bmatrix}
$$

所以它在基 $B$ 下的坐标是 $[3,1]^T$。

## 维数是基向量的数量

同一有限维空间的所有基都含有相同数量的向量，这个数量称为空间的维数。维数衡量的是独立自由度，而不是向量写出来有多少个数字。

例如，$\mathbb{R}^3$ 中经过原点的平面通常是二维子空间，因为只需两个独立方向就能描述平面上的任意向量。
