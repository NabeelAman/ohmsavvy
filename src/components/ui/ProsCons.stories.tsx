import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProsCons } from "./ProsCons";

const meta = {
  title: "Components/ProsCons",
  component: ProsCons,
} satisfies Meta<typeof ProsCons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pros: ["Excellent thermal recovery under load", "Widely available genuine replacement tips"],
    cons: ["Counterfeit units exist — buy from authorized sellers", "Bulkier than portable options"],
  },
};
