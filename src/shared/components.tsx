import { Button, ButtonProps, Input, InputProps } from "antd"
import { ReactNode, RefAttributes, useEffect } from "react"
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form"
import { useNavigate } from "react-router-dom"

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

export const InputField = ({ field, defaultValue, ...props }: InputFieldProps) => {
  const { control, formState: { errors } } = useFormContext()

  const rules = {
    required: props.isRequired ? '* Это поле является обязательным' : false,
    minLength: props.lengthMin ? { value: props.lengthMin, message: `* Минимальная длинна ${props.lengthMin}` } : undefined,
    maxLength: props.lengthMax ? { value: props.lengthMax, message: `* Максимальная длинна ${props.lengthMax}` } : undefined,
  }

  return (
    <div style={{ margin: '20px 0 20px 0' }}>
      <Controller
        name={field}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          props.password ? (
            <Input.Password
              {...props}
              onChange={onChange}
              onBlur={onBlur}
              value={value || ''}
              ref={ref}
            />
          ) : (
            <Input
              {...props}
              onChange={onChange}
              onBlur={onBlur}
              value={value || ''}
              ref={ref}
            />
          )
        )}
      />
      {errors[field] && <span style={{ color: 'red' }}>{String(errors[field].message)}</span>}
    </div>
  )
}


interface FormLayoutProps {
  children: ReactNode
  onSubmit: (data: any) => void
  textButton?: string
  route?: string
}

export const FormLayout = ({ children, onSubmit, textButton, route }: FormLayoutProps) => {
  const methods = useForm()
  const navigate = useNavigate()

  useEffect(() => {
    const subscription = methods.watch(() => {
      if (methods.formState.isSubmitSuccessful && route) {
        navigate(route)
      }
    })

    return () => subscription.unsubscribe()
  }, [methods, navigate, route])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
        <AntdSubmitButton>
          {textButton ? textButton : 'Отправить'}
        </AntdSubmitButton>
      </form>
    </FormProvider>
  )
}
