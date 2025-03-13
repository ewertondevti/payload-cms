import { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form'
import { Title } from '../Title'
import { fields } from './fields'

type GroupProps = {
  name: string
  title: string
  fields: { blockType: string; name: string }[]
}

export const Group: React.FC<GroupProps & UseFormReturn & { errors: FieldErrors<FieldValues> }> = ({
  fields: fieldsFromProps,
  name,
  title,
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-64 w-full">
      <h2 className="text-l-bold text-primary-900">{title}</h2>
      <div className="flex flex-wrap gap-32 w-full">
        {fieldsFromProps.map((field) => {
          const Field = fields?.[field.blockType] as React.FC<any> | undefined
          if (Field) {
            return <Field key={`${name}-${field.name}`} {...field} {...rest} />
          }
          return null
        })}
      </div>
    </div>
  )
}
