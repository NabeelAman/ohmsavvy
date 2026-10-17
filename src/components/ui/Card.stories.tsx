import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card } from "./Card";

const meta = {
  title: "Components/Card",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Surface: Story = {
  args: {
    children: <p>Default surface card — used for comparison callouts and spec lists.</p>,
  },
};

export const Raised: Story = {
  args: {
    raised: true,
    children: <p>Raised surface — used for the homepage methodology section.</p>,
  },
};
