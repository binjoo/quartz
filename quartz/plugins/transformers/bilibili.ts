import { QuartzTransformerPlugin } from "../types"

export interface Options {
  width: string,
  height: string,
  autoplay: boolean
}

const defaultOptions: Options = {
  width: '800px',
  height: '450px',
  autoplay: false
}

export const BilibiliEmbed: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "BilibiliEmbed",

    textTransform(_ctx, src) {
      const bilibiliRegex = /!\[bilibili:([a-zA-Z0-9]+)\]/g
      return src.replace(bilibiliRegex, (_, videoId) => {
        return `<iframe src="https://player.bilibili.com/player.html?bvid=${videoId}" style="width: ${opts.width}; height: ${opts.height}; border: none" allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"></iframe>`
      })
    }
  }
}