import { Modal, Form, Button, message, Spin } from "antd";
import { useEffect } from "react";
import { useUpdateAssetMutation, useGetAssetQuery } from "@/api/assetsApi";
import { AssetForm, type AssetFormValues } from "./AssetForm";

type EditAssetModalProps = {
  assetId: string | null;
  visible: boolean;
  onClose: () => void;
};

export default function EditAssetModal({
  assetId,
  visible,
  onClose,
}: EditAssetModalProps) {
  const [form] = Form.useForm<AssetFormValues>();

  const { data: asset, isLoading: isFetchingAsset } = useGetAssetQuery(
    assetId!,
    {
      skip: !assetId,
    }
  );

  const [updateAsset, { isLoading: isUpdating }] = useUpdateAssetMutation();

  useEffect(() => {
    if (asset) {
      form.setFieldsValue(asset);
    } else {
      form.resetFields();
    }
  }, [asset, form]);

  const handleFinish = async (values: AssetFormValues) => {
    if (!assetId) return;
    try {
      await updateAsset({ id: assetId, patch: values }).unwrap();
      message.success("Asset updated successfully!");
      onClose();
    } catch (err) {
      message.error("Failed to update asset.");
    }
  };

  return (
    <Modal
      title={`Edit Asset: ${asset?.name ?? ""}`}
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isUpdating}
          onClick={() => form.submit()}
        >
          Save Changes
        </Button>,
      ]}
    >
      {isFetchingAsset ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "48px 0",
          }}
        >
          <Spin />
        </div>
      ) : (
        <AssetForm form={form} onFinish={handleFinish} />
      )}
    </Modal>
  );
}
