/// <reference types="vite/client" />

import {Component} from "vue";

/**
 * 卡片配置项
 */
export interface CardOption {
    layout?: 'min' | 'max' | 'small'//设置默认值
    background?: string
    color?: string
}

export interface WidgetOption<T> {
    name: string
    component: string
    id: string
    // options 类型不一定
    options?: T
}

export interface CountdownOption {
    startTime: string
    endTime: string
}

export interface WebsiteOption {
    name: string
    src: string
    icon: string
    imgSrc: string
    description: string
    backgroundColor: string
    top: number
    url: string
    _id: string
}