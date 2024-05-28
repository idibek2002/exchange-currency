import { NativeSelect } from "@mantine/core";

export const Select = ({data, ...props}: any) => {
    
return (
    <NativeSelect
    data={data}
    rightSectionWidth={28}
    styles={{
        input: {
            fontWeight: 400,
            borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          width: "100%",
        },
    }}
    {...props}
    />
);
}