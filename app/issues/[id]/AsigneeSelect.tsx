import { Select } from "@radix-ui/themes";

const AsigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assignee" />
      <Select.Content>
        <Select.Group>
          <Select.Item value="1">John Doe</Select.Item>
          <Select.Item value="2">Jane Doe</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AsigneeSelect;
