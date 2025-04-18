import { Combobox, useCombobox, UnstyledButton, Group } from "@mantine/core";
import { useState, useEffect } from "react";
import { StatusTypes } from "../types";
import { IconChevronDown } from "@tabler/icons-react";
import StatusBadge from "./StatusBadge";

type Props = {
  status: StatusTypes;
  onSelect: (value: StatusTypes) => void;
};

const SelectStatus = ({ status, onSelect }: Props) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<StatusTypes>(status);

  useEffect(() => {
    if (status) {
      setValue(status);
    }
  }, [status]);

  const options = (
    ["Not started", "In progress", "Complete", "Blocked"] as StatusTypes[]
  ).map((option) => (
    <Combobox.Option value={option} key={option}>
      <StatusBadge status={option} />
    </Combobox.Option>
  ));

  const handleSelect = (new_value: StatusTypes) => {
    onSelect(new_value);
    setValue(new_value);
    combobox.closeDropdown();
  };

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => handleSelect(val as StatusTypes)}
    >
      <Combobox.Target>
        <UnstyledButton
          onClick={() => combobox.toggleDropdown()}
          style={{
            width: "80%",
          }}
        >
          <Group gap="xs">
            {value && <StatusBadge status={value} />}
            <IconChevronDown size="1rem" stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Combobox.Target>

      <Combobox.Dropdown style={{ width: "100%" }}>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default SelectStatus;
