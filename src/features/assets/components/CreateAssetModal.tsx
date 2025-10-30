import { Modal, Form, Button, message } from "antd";
import { useCreateAssetMutation } from "@/api/assetsApi";
import { AssetForm, type AssetFormValues } from "./AssetForm";

type CreateAssetModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function CreateAssetModal({
  visible,
  onClose,
}: CreateAssetModalProps) {
  const [form] = Form.useForm<AssetFormValues>();
  const [createAsset, { isLoading }] = useCreateAssetMutation();

  const handleFinish = async (values: AssetFormValues) => {
    try {
      await createAsset(values).unwrap();
      message.success("Asset created successfully!");
      form.resetFields();
      onClose();
    } catch (err) {
      message.error("Failed to create asset.");
    }
  };

  return (
    <Modal
      title="Create New Asset"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isLoading}
          onClick={() => form.submit()}
        >
          Create
        </Button>,
      ]}
    >
      <AssetForm form={form} onFinish={handleFinish} />
    </Modal>
  );
}
