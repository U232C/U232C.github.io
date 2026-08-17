---
title: 线性代数入门：从向量开始理解空间
description: 从几何箭头与有序数组两种视角认识向量，并掌握加法、数乘、线性组合和张成的含义。
date: 2026-07-01
category: 线性代数
tags:
  - 数学
  - 向量
  - 入门
draft: false
pinned: false
banner: false
---

## 向量不只是一个箭头

在平面几何中，向量通常被画成带方向的箭头。例如

$$
\boldsymbol{v}=\begin{bmatrix}3\\2\end{bmatrix}
$$

表示向右移动 3 个单位、向上移动 2 个单位。在线性代数里，我们更关心它的代数形式：一组有顺序的数。这样一来，像商品销量、图像像素和模型参数都可以被视为高维向量。

## 加法与数乘

向量加法按分量进行：

$$
\begin{bmatrix}1\\2\end{bmatrix}+
\begin{bmatrix}3\\-1\end{bmatrix}=
\begin{bmatrix}4\\1\end{bmatrix}
$$

数乘则会缩放向量。负数不仅改变长度，也会反转方向：

$$
-2\begin{bmatrix}1\\2\end{bmatrix}=
\begin{bmatrix}-2\\-4\end{bmatrix}
$$

## 线性组合与张成

给定向量 $\boldsymbol{v}_1,\boldsymbol{v}_2$，表达式

$$
a\boldsymbol{v}_1+b\boldsymbol{v}_2
$$

称为它们的线性组合，其中 $a,b$ 是标量。让系数取遍所有实数，得到的全部结果构成这组向量的张成空间。

如果平面中的两个向量不共线，它们可以张成整个平面；如果二者共线，无论怎样组合，结果仍然只能落在同一条直线上。

::callout
“张成”回答的是一个重要问题：只使用现有方向进行缩放与叠加，我们究竟能到达哪些位置？
::

## 一个自检问题

向量 $[1,2]^T$ 与 $[2,4]^T$ 能否张成二维平面？不能，因为第二个向量是第一个的 2 倍，它们实际上只提供了一个独立方向。
