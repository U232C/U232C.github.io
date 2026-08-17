---
title: 矩阵是什么：数据表、方程组与空间变换
description: 用三种互补视角理解矩阵，并通过矩阵乘法认识多个线性变换的组合。
date: 2026-07-03
category: 线性代数
tags:
  - 数学
  - 矩阵
  - 线性变换
draft: false
pinned: false
banner: false
---

## 三种看待矩阵的方式

矩阵首先是一张按行列排列的数字表：

$$
A=\begin{bmatrix}1&2\\3&4\end{bmatrix}
$$

它也可以编码线性方程组的系数，或者描述一个线性变换。后一种视角尤其重要：矩阵乘向量，就是把输入向量变换成新的输出向量。

$$
A\boldsymbol{x}=
\begin{bmatrix}1&2\\3&4\end{bmatrix}
\begin{bmatrix}x_1\\x_2\end{bmatrix}=
\begin{bmatrix}x_1+2x_2\\3x_1+4x_2\end{bmatrix}
$$

矩阵的每一列，正是标准基向量经过变换后的去向。

## 为什么矩阵乘法这样定义

设 $B$ 先作用于向量，$A$ 再作用于结果，则组合变换为

$$
A(B\boldsymbol{x})=(AB)\boldsymbol{x}
$$

矩阵乘法的定义保证了这种组合关系成立。若 $A$ 为 $m\times n$ 矩阵，$B$ 为 $n\times p$ 矩阵，那么 $AB$ 的形状是 $m\times p$。中间的维度必须相同，因为 $B$ 的输出要能成为 $A$ 的输入。

## 乘法通常不可交换

一般来说，$AB\ne BA$。几何上也很好理解：先旋转再拉伸，与先拉伸再旋转，通常不会到达同一个位置。

单位矩阵是一个例外角色：

$$
I=\begin{bmatrix}1&0\\0&1\end{bmatrix},\qquad AI=IA=A
$$

它对应“什么也不做”的恒等变换。

## 转置

转置会交换矩阵的行与列，记作 $A^T$。它在内积、最小二乘和对称矩阵中频繁出现。若 $A=A^T$，则称 $A$ 为对称矩阵；这类矩阵拥有非常良好的特征值性质。
