import { Block, Field } from 'payload'
import { AddressBlock } from '../Address/AddressBlock'
import { BirthCertificateBlock } from '../BirthCertificateData/BirthCertificateDataBlock'
import { BirthdateBlock } from '../Birthdate/BirthdateBlock'
import { BirthplaceBlock } from '../Birthplace/BirthplaceBlock'
import { ContactBlock } from '../ContactData/ContactDataBlock'
import { CustomTextfieldBlock } from '../CostumTextfield/CustomTextfieldBlock'
import { CustomMessageBlock } from '../CustomMessage/CustomMessageBlock'
import { CustomNumberBlock } from '../CustomNumber/CustomNumberBlock'
import { DropdownBlock } from '../Dropdown/DropdownBlock'
import { HeaderBlock } from '../Header/HeaderBlock'
import { IdBlock } from '../IdData/IdDataBlock'
import { IdentificationDataBlock } from '../IdentificationData/IdentificationDataBlock'
import { NationalityBlock } from '../Nationality/NationalityBlock'
import { NifBlock } from '../Nif/NifBlock'
import { PhoneNumberBlock } from '../PhoneNumber/PhoneNumberBlock'
import { PreLoadExample1Block } from '../PreloadExample1/PreLoadExample1'
import { RadioButtonBlock } from '../RadioButtonGroup/RadioButtonGroupBlock'
import { RequestorBlock } from '../RequestorData/RequestorDataBlock'
import { SelectWithApiBlock } from '../SelectWithAPI/SelectWithApiBlock'
import { TextAreaBlock } from '../Textarea/TextAreaBlock'
import { TitleBlock } from '../Title/TitleBlock'
import { FlexRadioButtonGroupBlock } from '../Cidadao/FlexRadioButtonGroup/FlexRadioButtonGroupBlock'
import { SecondParentBlock } from '../Cidadao/SecondParent/SecondParentBlock'

const title: Field = {
  name: 'title',
  type: 'text',
  label: 'Title',
  required: true,
}

const arrayFields: Field = {
  name: 'fields',
  type: 'blocks',
  blocks: [
    CustomMessageBlock,
    CustomNumberBlock,
    NifBlock,
    RadioButtonBlock,
    CustomTextfieldBlock,
    AddressBlock,
    BirthCertificateBlock,
    ContactBlock,
    IdBlock,
    RequestorBlock,
    HeaderBlock,
    DropdownBlock,
    NationalityBlock,
    PhoneNumberBlock,
    PreLoadExample1Block,
    BirthdateBlock,
    TextAreaBlock,
    TitleBlock,
    SelectWithApiBlock,
    IdentificationDataBlock,
    BirthplaceBlock,
    FlexRadioButtonGroupBlock,
    SecondParentBlock
  ],
  labels: {
    singular: 'Field',
    plural: 'Fields',
  },
}

export const GroupBlock: Block = {
  slug: 'group',
  fields: [title, arrayFields],
}
