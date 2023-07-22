// YourComponent.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';
import MainContainer from './MainContainer';


//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof MainContainer> = {
  component: MainContainer,
};

export default meta;
type Story = StoryObj<typeof MainContainer>;

export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};
