import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Stars } from "./Stars";

const meta = {
  title: "Components/Stars",
  component: Stars,
  argTypes: {
    rating: { control: { type: "range", min: 0, max: 5, step: 0.1 } },
  },
} satisfies Meta<typeof Stars>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { rating: 4.8 },
};

export const AllRatings: Story = {
  args: { rating: 4.8 },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {[5, 4.8, 4.3, 3.9, 2.5].map((r) => (
        <Stars key={r} rating={r} />
      ))}
    </div>
  ),
};
