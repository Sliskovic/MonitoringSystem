import { Form, Input, Select } from "antd";
import type { FormInstance } from "antd";
import type { Asset } from "@/api/assetsApi";

const { Option } = Select;

export type AssetFormValues = Omit<Asset, "id">;

type AssetFormProps = {
  form: FormInstance<AssetFormValues>;
  onFinish: (values: AssetFormValues) => void;
};

export const AssetForm = ({ form, onFinish }: AssetFormProps) => {
  return (
    <Form form={form} layout="vertical" onFinish={onFinish} name="asset_form">
      <Form.Item
        name="name"
        label="Asset Name"
        rules={[{ required: true, message: "Please input the asset name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: "Please select a status!" }]}
      >
        <Select placeholder="Select a status">
          <Option value="active">Active</Option>
          <Option value="warning">Warning</Option>
          <Option value="critical">Critical</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="type"
        label="Type"
        rules={[{ required: true, message: "Please select a type!" }]}
      >
        <Select placeholder="Select a type">
          <Option value="hardware">Hardware</Option>
          <Option value="software">Software</Option>
        </Select>
      </Form.Item>
    </Form>
  );
};
