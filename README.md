# web-word-segment

A Web App for Chinese Word Segmentation based on [jieba-wasm](https://github.com/fengkx/jieba-wasm) and [Intl.Segmenter](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter).

基于 [jieba-wasm](https://github.com/fengkx/jieba-wasm) 和 [Intl.Segmenter](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter) 的中文分词 Web 应用。

[在线体验 / Try it Online](https://seg.maxchang.me/)

## 技术栈 / Tech Stack

- 框架 / Framework: [Vue.js](https://vuejs.org/)
    - UI:
        - [shadcn-vue](https://github.com/unovue/shadcn-vue)：Vue port of [shadcn/ui](https://github.com/shadcn-ui/ui)
        - [UnoCSS](https://unocss.dev/) support by [unocss-preset-shadcn](https://github.com/hyoban/unocss-preset-shadcn)
- 分词库 / Segmentation Library:
    - [jieba-wasm](https://github.com/fengkx/jieba-wasm)
    - [Intl.Segmenter](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter)

## TODO

总体目标：构建一个中文分词 PWA 应用。配合 iOS 快捷指令使用，复刻类似于主流安卓系统中的「分词」功能。

- [ ] Web 实现

    - [x] 基础功能
    - [ ] 多个版本构建

        - [ ] PWA 版本
        - [ ] iOS 快捷指令集成
            - [x] 单文件精简版
                - 仅使用 Intl.Segmenter
                - 所有资源合并为单一文件
            - [ ] 单文件仅前端展示版
                - 无分词功能，仅作为展示载体

- [ ] 快捷指令部分

    - [ ] 采用 [cherri](https://github.com/electrikmilk/cherri) 框架构建快捷指令版本
    - [ ] 参照 [Actions](https://github.com/sindresorhus/Actions) 模式打包 jieba 分词引擎
        - 基于 [App Intents](https://developer.apple.com/documentation/appintents)

Overall Goal: Build a Chinese Word Segmentation PWA App. Use with iOS Shortcuts to replicate the "Segmentation" feature in mainstream Android systems.

- [ ] Web Implementation

    - [x] Basic Functions
    - [ ] Multiple Builds

        - [ ] PWA Version
        - [ ] iOS Shortcuts Integration
            - [x] Single File Version
                - Only use Intl.Segmenter
                - All resources merged into a single file
            - [ ] Single File Frontend Only Version
                - No segmentation function, only as a display carrier

- [ ] Shortcuts Part
    - [ ] Build the shortcut version using the [cherri](https://github.com/electrikmilk/cherri)
    - [ ] Reference the [Actions](https://github.com/sindresorhus/Actions)
        - Based on [App Intents](https://developer.apple.com/documentation/appintents)
