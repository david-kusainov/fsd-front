import { Button, ButtonProps, Input, InputProps } from "antd"
import { ReactNode, RefAttributes } from "react"
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form"

export const AntdButton = (props: JSX.IntrinsicAttributes & ButtonProps & RefAttributes<HTMLAnchorElement | HTMLButtonElement>) => {
  return <Button type={props.type || 'primary'} block {...props} />
}

export const AntdSubmitButton = (props: JSX.IntrinsicAttributes & ButtonProps & RefAttributes<HTMLAnchorElement | HTMLButtonElement>) => {
  return <Button type="primary" htmlType="submit" block {...props} />
}

interface FieldProps {
  field: string
  isRequired?: boolean
  lengthMin?: number
  lengthMax?: number
  password?: boolean
}

type InputFieldProps = InputProps & FieldProps;

export const InputField = ({ field, ...props }: InputFieldProps) => {
  const { control, formState: { errors } } = useFormContext()

  const rules = {
    required: props.isRequired ? '* Это поле является обязательным' : false,
    minLength: props.lengthMin ? { value: props.lengthMin, message: `* Минимальная длинна ${props.lengthMin}` } : undefined,
    maxLength: props.lengthMax ? { value: props.lengthMax, message: `* Максимальная длинна ${props.lengthMax}` } : undefined,
  }

  if(props.password) {
    return (
      <div style={{margin: '10px 0 30px 0'}}>
      <Controller
        name={field}
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Input.Password
            {...props}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            ref={ref}
          />
        )}
      />
      {errors[field] && <span style={{color: 'red'}}>{String(errors[field].message)}</span>}
    </div>
    )
  }

  return (
    <div style={{margin: '10px 0 30px 0'}}>
      <Controller
        name={field}
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Input
            {...props}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            ref={ref}
          />
        )}
      />
      {errors[field] && <span style={{color: 'red'}}>{String(errors[field].message)}</span>}
    </div>
  )
}

interface FormLayoutProps {
  children: ReactNode
  onSubmit: (data: any) => void
}
 
export const FormLayout = ({children, onSubmit}: FormLayoutProps ) => {
  const methods = useForm()
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  )
}
