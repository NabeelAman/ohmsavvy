import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SpecList } from "./SpecList";

const meta = {
  title: "Components/SpecList",
  component: SpecList,
} satisfies Meta<typeof SpecList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    specs: [
      { label: "CAT rating", value: "CAT III 600V" },
      { label: "True RMS", value: "Yes" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Field electricians" },
    ],
  },
};
