import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Logo, LogoMark } from "./Logo";

const meta = {
  title: "Components/Logo",
  component: Logo,
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MarkOnly: Story = {
  render: () => <LogoMark size={48} />,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
      <LogoMark size={20} />
      <LogoMark size={32} />
      <LogoMark size={48} />
      <LogoMark size={64} />
    </div>
  ),
};
