// YourComponent.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';
import FilterBoxes from './FilterBoxes';


//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof FilterBoxes> = {
  component: FilterBoxes,
};

export default meta;
type Story = StoryObj<typeof FilterBoxes>;

export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};
