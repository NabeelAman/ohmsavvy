import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RankBadge } from "./RankBadge";

const meta = {
  title: "Components/RankBadge",
  component: RankBadge,
} satisfies Meta<typeof RankBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const First: Story = {
  args: { rank: 1 },
};

export const Sequence: Story = {
  args: { rank: 1 },
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem" }}>
      <RankBadge rank={1} />
      <RankBadge rank={2} />
      <RankBadge rank={3} />
      <RankBadge rank={4} />
    </div>
  ),
};
