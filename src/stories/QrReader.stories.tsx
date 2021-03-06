import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import QrReader from "../QrReader/QrReader";
import { ScanError, ScanResult } from "interfaces";

const styles = {
  container: {
    width: "400px",
    margin: "auto",
  },
};

export default {
  title: "QrReader",
  component: QrReader,
} as ComponentMeta<typeof QrReader>;

//👇 We create a “template” of how args map to rendering
const QrReaderTemplate: ComponentStory<typeof QrReader> = (args) => {
  const [error, setError] = useState<ScanError | undefined>(undefined);
  const [data, setData] = useState<ScanResult | undefined>(undefined);

  return (
    <div style={styles.container}>
      <QrReader
        {...args}
        styles={{
          video: {},
          videoContainer: {},
          container: {},
        }}
        onResult={setData}
        onError={setError}
      />
      <div>The value is: {JSON.stringify(data, null, 2)}</div>
      <div>The error is: {error?.toString()}</div>
    </div>
  );
};

export const QrReaderMain = QrReaderTemplate.bind({});

QrReaderMain.args = {
  viewFinderConfig: {
    visible: false,
  },
};
