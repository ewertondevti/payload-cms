import { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form'
import { Title } from '../Title'
import { fields } from './fields'

type GroupProps = {
  name: string
  label: string
  fields: { blockType: string; name: string }[]
}

export const Group: React.FC<GroupProps & UseFormReturn & { errors: FieldErrors<FieldValues> }> = ({
  fields: fieldsFromProps,
  name,
  label,
  ...rest
}) => {
  return (
    <>
      <Title label={label} />
      <div className="flex flex-wrap gap-32 w-full">
        {fieldsFromProps.map((field) => {
          const Field = fields?.[field.blockType] as React.FC<any> | undefined
          if (Field) {
            return <Field key={`${name}-${field.name}`} {...field} {...rest} />
          }
          return null
        })}
      </div>
    </>
  )
}
