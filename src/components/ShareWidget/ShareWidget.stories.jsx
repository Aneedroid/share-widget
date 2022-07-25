import React from 'react';

import { ShareWidget } from './ShareWidget';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Share',
  component: ShareWidget,
  argTypes: {
    peopleData: {
      control: 'object'
    },
    groupData: {
      control: 'object'
    },
  },
  parameters : {
    controls: {
      hideNoControlsWarning: true,
    }
  }
};

const peopleData = [
    {
      id: '0',
      name: "Daenerys Targaryen",
      title: "Mother of Dragons",
      family: ["House Targaryen"],
      access: "FULL_ACCESS",
      imageUrl: "https://thronesapi.com/assets/images/daenerys.jpg"
    },
    {
      id: '1',
      name: "Jon Snow",
      title: "King of the North",
      family: ["House Stark"],
      access: "FULL_ACCESS",
      imageUrl: "https://thronesapi.com/assets/images/jon-snow.jpg"
    },
    {
      id: '2',
      name: "Tyrion Lannister",
      access: "FULL_ACCESS",
      title: "Hand of the Queen",
      family: ["House Lannister"],
      imageUrl: "https://thronesapi.com/assets/images/tyrion-lannister.jpg"
    },
    {
      id: '3',
      name: "Ygritte",
      access: "FULL_ACCESS",
      title: "Spearwife",
      family: ["Free Folk"],
      imageUrl: "https://thronesapi.com/assets/images/ygritte.jpg"
    },
  ];

  const groupData = [
    {
      id: '4',
      name: "House Targaryen",
    },
    {
      id: '5',
      name: "Free Folk",
    },
    {
      id: '6',
      name: "House Lannister",
    },
    {
      id: '7',
      name: "House Stark",
    }
  ]

export const Primary = () => <ShareWidget peopleData={peopleData} groupData={groupData}>Button</ShareWidget>;