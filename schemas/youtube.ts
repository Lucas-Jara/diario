import { YouTubePreview } from '@/components'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'youtube',
  title: 'Youtube',
  type: 'object',
  fields: [
    defineField({
        name:"url",
        type:"url",
        title:"YouTube video URL"
    })
  ],
  preview: {
    select: {
      url: 'url',
    },
  },
  components: {
    preview: YouTubePreview,
  },
})