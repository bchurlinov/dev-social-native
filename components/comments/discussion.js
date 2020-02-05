import React, { useState } from "react";
import { View, Text } from "react-native";
import { Layout, Select } from "@ui-kitten/components";

const data = [
    { text: 'Option 1' },
    { text: 'Option 2' },
    { text: 'Option 3' },
];

const Discussion = () => {

    const [selectedOption, setSelectedOption] = useState([]);

    return (
        <View style={{ padding: 40 }}>
            <Layout>
                <Select
                    data={data}
                    multiSelect={true}
                    selectedOption={selectedOption}
                    onSelect={setSelectedOption}
                />
            </Layout>
        </View>
    )
}

export default Discussion;