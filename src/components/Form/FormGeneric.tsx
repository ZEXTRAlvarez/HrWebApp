import { Button, Checkbox, Form, Input } from 'antd';
import type { FormProps, FormItemProps } from 'antd';
import "./FormGeneric.css";

type FormGenericProps<T> = {
  fields: Array<{
    label: string;
    name: keyof T;
    type: 'text' | 'password' | 'checkbox';
    rules?: FormItemProps['rules'];
  }>;
  initialValues?: Partial<T>;
  onFinish: FormProps<T>['onFinish'];
  onFinishFailed?: FormProps<T>['onFinishFailed'];
  submitLabel?: string;
};

const FormGeneric = <T extends object>({
  fields,
  initialValues,
  onFinish,
  onFinishFailed,
  submitLabel = 'Submit',
}: FormGenericProps<T>) => {
  return (
    <Form
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      {fields.map((field) => (
        <Form.Item
          key={String(field.name)}
          label={field.label}
          name={field.name as unknown as string}
          rules={field.rules}
          valuePropName={field.type === 'checkbox' ? 'checked' : undefined}
        >
          {field.type === 'text' && <Input />}
          {field.type === 'password' && <Input.Password />}
          {field.type === 'checkbox' && <Checkbox />}
        </Form.Item>
      ))}

      <Form.Item className="login_form">
        <Button type="primary" htmlType="submit" className='btnSubmit'>
          {submitLabel}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormGeneric;
