import React, { useRef, useState } from 'react'

import Quill from 'quill'

import { Attachment, Media, Mention } from './@types'

import { Composer, composerDefaultMenuItems } from '.'

const value =
  '<h2 class="text-4xl">Header one</h2><p><br></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel dolor a quam faucibus dapibus ac non magna. Aliquam malesuada felis erat, eu luctus nunc scelerisque non. Suspendisse potenti. Nunc feugiat lectus ante, vel consequat arcu convallis volutpat. Na<strong>m lectus leo, viverra s</strong>it amet lorem vitae, varius posuere turpis. Donec eleifend orci justo, eget feugiat ante blandit a. Integer consequat sem pulvinar ultricies blandit. Nunc facilisis, metus at rhon<strong>cus vehicula, dolor libero fringilla erat, tristique commodo tellus erat ut est.</strong></p><figure class="imageBlot" data-type="image"><img width="auto" height="auto" src="https://i.picsum.photos/id/732/200/300.jpg?hmac=mBueuWVJ8LlL-R7Yt9w1ONAFVayQPH5DzVSO-lPyI9w" alt=""></figure><p><br></p><p><strong>Quisque efficitur egestas</strong> erat, eu iaculis leo lobortis sit amet. Donec aliquet ipsum nulla, eget molestie lacus pretium sit amet. Nulla vulputate pulvinar rhoncus. Aliquam ultrices, nisl et pretium imperdiet, tortor dui semper eros, vel malesuada neque elit a purus.</p><p><br></p><ul><li>Bulleted list item 1</li><li>Bulleted list item 2</li><li>Bulleted list item 3</li><li>Bulleted list item 4</li><li>Bulleted list item 5</li></ul><p><br></p><p>Vestibulum in molestie libero, vehicula commodo massa. Aliquam erat volutpat. Fusce sodales auctor quam id sollicitudin. In quam nisl, laoreet eget accumsan vel, consequat eget purus. Pellentesque tempor sollicitudin nibh, vitae commodo tellus sollicitudin quis. Nunc<em> rutrum tempus sem id</em> commodo.</p><p><br></p><div class="embed" data-type="embed" data-id="EguWdYFwdG2SMsShDjJOH"></div><p><br></p><p><br></p><h3 class="text-2xl">Medium header</h3><p><br></p><p>Duis efficitur ligula urna, eget tempus enim accumsan eget. Sed malesuada lobortis eros quis dictum. Sed viverra malesuada s<a href="https://tailwindcss.com/docs/border-color" rel="noopener noreferrer" target="_blank">apien in lobortis. M</a>orbi ante purus, egestas sit amet arcu porttitor, varius cursus nunc. Phasellus consectetur eu magna quis finibus. Duis eget nulla a tortor blandit semper sed non leo. Integer bibendum felis ac sollicitudin malesuada.</p><p><br></p><ol><li>Numbered list item 1</li><li>Numbered list item 2</li><li>Numbered list item 3</li><li>Numbered list item 4</li><li>Numbered list item 5</li></ol><p><br></p><p>Nam tempor mi ac eros egestas, nec tristique leo sodales. Suspendisse semper felis eros, ut pretium lorem aliquam eu. In posuere, orci sit amet ullamcorper ultrices, velit 🤪 mauris hendrerit libero, sed accumsan est 💆 nibh tempus elit. Nulla ante justo, ornare et turpis ac, euismod finibus libero. Fusce blandit lo<a href="https://tailwindcss.com/docs/border-color" rel="noopener noreferrer" target="_blank">rem sit amet venenatis semper. A</a>liquam id lorem tellus. Maecenas eget posuere est, eu consequat nisi. Nullam eros sem, scelerisque rhoncus sodales ac, pharetra et velit.</p><p><br></p><p>😀 😘 😆</p><p><br></p><h3 class="text-2xl">Cras tristique orci eget odio tristique auctor. Suspendisse potenti. Phasellus vestibulum velit sit amet interdum iaculis. Morbi erat diam, gravida et luctus vitae, mollis in justo. Phasellus felis magna, malesuada sit amet est ac, sodales ultrices elit. Sed lectus augue, tincidunt quis ipsum ac, luctus lobortis urna.</h3><p><br></p><p>Another embed:</p><p><br></p><div class="embed" data-type="embed" data-id="BsvsuhPfMvsWfn1VUZzt7"></div><p><br></p><p><br></p><p><a data-id="1" data-type="mention" class="mentionBlot text-actionPrimary-600">﻿<span contenteditable="false">@<span>Kamran</span></span>﻿</a> mentioning someone. <a data-id="2" data-type="mention" class="mentionBlot text-actionPrimary-600">﻿<span contenteditable="false">@<span>Kamil</span></span>﻿</a> second mention also works.</p><h3 class="text-2xl"><br></h3><h3 class="text-2xl">Quisque efficitur purus sed ante imperdiet pulvinar. Cras cursus ipsum eu lacus aliquam cursus. <a href="http://youtube.com/" rel="noopener noreferrer" target="_blank">External link to a website.</a> Cras iaculis consequat efficitur. Cras tempor pellentesque posuere. Mauris facilisis orci a ex rhoncus rutrum lacinia id sem. Nunc efficitur, enim a ultrices pretium, lectus lectus pellentesque dolor, eget mattis quam eros nec elit. Vivamus ac lorem pharetra, ultricies nulla ut, blandit tortor.</h3><p><br></p><figure class="imageBlot" data-type="image"><img width="auto" height="auto" src="https://i.picsum.photos/id/106/1000/500.jpg?hmac=yQJvF0ES5PEEApsJ9E002IosK9wYKY-2M9M46GiDxa4" alt=""></figure><p><br></p><p>Duis a lobortis nibh. Etiam a euismod ex. Nunc ultrices ultrices porta. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi fringilla est vel dictum convallis. Ut tortor nisi, pretium ac enim non, iaculis efficitur libero. Nunc eget lobortis ipsum. Sed sit amet eros tellus. Mauris dictum convallis justo at venenatis. Morbi volutpat nisl sed ipsum efficitur, quis ornare nunc dignissim. Sed euismod fermentum tellus id lacinia. Vestibulum non elementum dui, nec aliquet metus.</p>'

// For testing purposes
const mockYouTubeEmbed = {
  author: 'EminemMusic',
  html: '<div><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"><iframe src="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DFxQTY-W6GIo&amp;key=29ae8f7432aadad5ca7c91b46030e818" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen scrolling="no" allow="accelerometer *; clipboard-write *; encrypted-media *; gyroscope *; picture-in-picture *;"></iframe></div></div>',
  id: 'BsvsuhPfMvsWfn1VUZzt7',
  url: 'https://www.youtube.com/watch?v=FxQTY-W6GIo',
  thumbnail_url: 'https://i.ytimg.com/vi/FxQTY-W6GIo/maxresdefault.jpg',
  thumbnail_width: '1280',
  thumbnail_height: '720',
}

const mockCustomURLEmbed = {
  author: null,
  html: '<div><div style="left: 0; width: 100%; height: 140px; position: relative;"><iframe src="//cdn.iframe.ly/api/iframe?app=1&amp;url=https%3A%2F%2Ftribe.so%2F&amp;key=29ae8f7432aadad5ca7c91b46030e818" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>',
  id: 'EguWdYFwdG2SMsShDjJOH',
  url: 'https://tribe.so/',
  thumbnail_url: 'https://tribe.so/assets/images/twitter_og_image.jpg',
  thumbnail_width: '1200',
  thumbnail_height: '628',
}

const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

const mentionUsers = [
  {
    id: '1',
    title: 'Kamran',
    icon: `https://picsum.photos/${randomNumber(24, 100)}`,
  },
  {
    id: '2',
    title: 'Kamil',
    icon: `https://picsum.photos/${randomNumber(24, 100)}`,
  },
  {
    id: '3',
    title: 'Sergei',
    icon: `https://picsum.photos/${randomNumber(24, 100)}`,
  },
  {
    id: '4',
    title: 'Alan',
    icon: `https://picsum.photos/${randomNumber(24, 100)}`,
  },
  {
    id: '5',
    title: 'Bharath',
    icon: `https://picsum.photos/${randomNumber(24, 100)}`,
  },
  {
    id: '6',
    title: 'Siavash',
    icon: `https://picsum.photos/${randomNumber(24, 100)}`,
  },
]

const mockAttachments = [
  {
    id: '222222222',
    name: 'Very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very Tribe Secret Roadmap.pdf',
    size: 1205000,
    extension: 'pdf',
    url: 'https://pepa.holla.cz/wp-content/uploads/2016/08/You-Don-t-Know-JS-Scope-Closures.pdf',
  },
  {
    id: '444444444',
    name: 'Some image.jpg',
    size: 2123122,
    extension: 'jpg',
    url: 'https://resi.ze-robot.com/dl/4k/4k-desktop-wallpaper.-1920%C3%971200.jpg',
  },
  {
    id: '333333333',
    name: 'Second Tribe Secret Roadmap.pdf',
    size: 6413124,
    extension: 'pdf',
    url: 'https://eloquentjavascript.net/Eloquent_JavaScript.pdf',
  },
]

// Custom module registration example
const Module = Quill.import('core/module')
class CustomModule extends Module {}
Quill.register('modules/custom-module', CustomModule)

const mockMentionClick = (mention: Mention) =>
  console.log('Mention clicked:', mention)

const handleAttachmentUpload = (files: FileList) => {
  console.log(`Uploading attachments:`, files)

  return new Promise<Media[]>(resolve => {
    setTimeout(
      () =>
        resolve([
          {
            mediaUrl:
              'https://i.picsum.photos/id/182/300/300.jpg?hmac=D8OzC7jdktO56z0Mycvi3UrYLm68DWUPtIAipwNjd2I',
            mediaId: '2',
          },
        ]),
      10000,
    )
  })
}

export const Template = ({ isReadOnly }: any) => {
  const quillRef = useRef(null)
  const [attachments, setAttachments] = useState(mockAttachments)

  return (
    <div className="border bg-warning-50 w-full py-24 flex justify-center">
      <div className="w-3/4">
        <Composer
          isReadOnly={isReadOnly}
          embeds={[mockCustomURLEmbed, mockYouTubeEmbed]}
          mentions={mentionUsers}
          attachments={attachments}
          value={value}
          forwardedRef={quillRef}
          onMentionClick={mockMentionClick}
          onAttachmentDelete={(attachment: Attachment) => {
            console.log('Attachment delete:', attachment)

            setAttachments(attachments.filter(a => a.id !== attachment.id))
          }}
          handleAttachmentUpload={handleAttachmentUpload}
          modules={{
            mention: {
              search: (query: string) =>
                new Promise(resolve => {
                  setTimeout(
                    () =>
                      resolve(
                        mentionUsers.filter(({ title }) =>
                          title.toLowerCase().includes(query),
                        ),
                      ),
                    1000,
                  )
                }),
            },
            embed: {
              onEmbed: (url: string) =>
                new Promise(resolve => {
                  console.log(`url`, url)
                  setTimeout(() => resolve(mockCustomURLEmbed), 1000)
                }),
            },
            // slashMenu: {
            //   items: composerDefaultMenuItems,
            // },
            image: {
              handleImageUpload: files => {
                console.log(`Uploading images:`, files)

                return new Promise(resolve => {
                  setTimeout(
                    () =>
                      resolve([
                        {
                          mediaUrl:
                            'https://i.picsum.photos/id/732/200/300.jpg?hmac=mBueuWVJ8LlL-R7Yt9w1ONAFVayQPH5DzVSO-lPyI9w',
                          mediaId: '1',
                        },
                      ]),
                    1000,
                  )
                })
              },
            },

            // Custom module
            'custom-module': false,
          }}
        />
      </div>
    </div>
  )
}

export default {
  title: 'View/Composer',
  component: Composer,
  argTypes: {
    isReadOnly: {
      name: 'Read only mode',
      control: { type: 'boolean' },
    },
  },
  args: {
    isReadOnly: false,
  },
}
