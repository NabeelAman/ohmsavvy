import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SpecValue } from "./SpecValue";

const meta = {
  title: "Components/SpecValue",
  component: SpecValue,
} satisfies Meta<typeof SpecValue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Yes: Story = { args: { value: "Yes" } };
export const No: Story = { args: { value: "No" } };
export const PlainText: Story = { args: { value: "CAT III 600V" } };

export const AllVariants: Story = {
  args: { value: "Yes" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <SpecValue value="Yes" />
      <SpecValue value="No" />
      <SpecValue value="CAT III 600V" />
    </div>
  ),
};
