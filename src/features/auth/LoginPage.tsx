import { useEffect, useMemo, useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  Row,
  Col,
  message,
  Alert,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useLoginMutation } from "@/api/authApi";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const loginSchema = z.object({
  username: z.string().min(1, "Please enter your username"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Za-z]/, "Password must contain at least one letter")
    .regex(/\d/, "Password must contain at least one number"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [form] = Form.useForm<LoginFormValues>();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);

  const from = useMemo(
    () => ((location.state as any)?.from?.pathname as string) || "/dashboard",
    [location.state]
  );

  const token = useSelector((s: RootState) => s.auth.token);

  useEffect(() => {
    if (token) navigate("/dashboard", { replace: true });
  }, [token, navigate]);

  const onFinish = async (values: LoginFormValues) => {
    const validation = loginSchema.safeParse(values);
    if (!validation.success) {
      const firstMsg = validation.error.issues[0]?.message ?? "Invalid input";
      message.error(firstMsg);

      // Map only known fields to AntD errors
      form.setFields(
        validation.error.issues
          .map((iss) => {
            const field = iss.path[0];
            if (field === "username" || field === "password") {
              return { name: field, errors: [iss.message] as string[] };
            }
            return null;
          })
          .filter(Boolean) as {
          name: "username" | "password";
          errors: string[];
        }[]
      );
      return;
    }

    setError(null);
    try {
      await login(values).unwrap();
      message.success("Login successful");
      navigate(from, { replace: true }); // spriječi “Back” natrag na /login
    } catch (e: any) {
      const errMsg = e?.data?.message || "Invalid username or password";
      setError(errMsg);
      message.error(errMsg);
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f9fafb 0%, #eef0f3 100%)",
        padding: "1rem",
      }}
    >
      <Col xs={24} sm={16} md={10} lg={8} xl={6}>
        <Card
          style={{
            maxWidth: 350,
            margin: "0 auto",
            borderRadius: 16,
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
          bodyStyle={{ padding: "2rem 2rem 1.5rem" }}
        >
          <Typography.Title
            level={3}
            style={{
              textAlign: "center",
              marginBottom: 24,
              fontWeight: 600,
              color: "#1f1f1f",
            }}
          >
            Sign in
          </Typography.Title>

          <Form<LoginFormValues>
            form={form}
            layout="vertical"
            size="large"
            onFinish={onFinish}
            onValuesChange={() => {
              setError(null);
              // opcional: form.setFields([{ name: "username", errors: [] }, { name: "password", errors: [] }]);
            }}
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
            >
              <Input
                placeholder="Enter your username"
                autoComplete="username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </Form.Item>

            {error && (
              <Alert
                message={error}
                type="error"
                showIcon
                style={{ marginBottom: 16, borderRadius: 8 }}
              />
            )}

            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              block
              style={{
                borderRadius: 8,
                height: 45,
                fontWeight: 500,
                marginTop: error ? 0 : 8,
              }}
            >
              Sign in
            </Button>
          </Form>

          <Typography.Paragraph
            style={{
              textAlign: "center",
              marginTop: 32,
              color: "#8c8c8c",
              fontSize: 13,
            }}
          >
            © {new Date().getFullYear()} Monitoring Dashboard
          </Typography.Paragraph>
        </Card>
      </Col>
    </Row>
  );
}
