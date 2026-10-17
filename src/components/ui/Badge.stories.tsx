import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    variant: { control: "select", options: ["accent", "signal"] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Signal: Story = {
  args: { children: "Best Overall", variant: "signal" },
};

export const Accent: Story = {
  args: { children: "Multimeters", variant: "accent" },
};

export const AllBadges: Story = {
  args: { children: "Best Overall", variant: "signal" },
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      <Badge variant="signal">Best Overall</Badge>
      <Badge variant="signal">Best Budget</Badge>
      <Badge variant="signal">Best for Pros</Badge>
      <Badge variant="accent">Multimeters</Badge>
    </div>
  ),
};
