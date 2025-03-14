import { Block, Field } from 'payload'
import { AddressBlock } from '../Address/AddressBlock'
import { BirthCertificateBlock } from '../BirthCertificateData/BirthCertificateDataBlock'
import { DateOrYearPickerBlock } from '../DateOrYearPicker/DateOrYearPickerBlock'
import { LocationBlock } from '../Location/LocationBlock'
import { ContactBlock } from '../ContactData/ContactDataBlock'
import { CustomTextfieldBlock } from '../CostumTextfield/CustomTextfieldBlock'
import { CustomMessageBlock } from '../CustomMessage/CustomMessageBlock'
import { CustomNumberBlock } from '../CustomNumber/CustomNumberBlock'
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
import { TextBoxBlock } from '../TextBox/TextBoxBlock'
import { PriorWeddingChildrenDataBlock } from '../Cidadao/PriorWeddingChildrenData/PriorWeddingChildrenDataBlock'
import { TwinBirthDataBlock } from '../Cidadao/TwinBirthData/TwinBirthDataBlock'
import { SelectBlock } from '../Select/SelectBlock'
import { DropdownBlock } from '../Dropdown/DropdownBlock'

const name: Field = {
  name: 'name',
  type: 'text',
  label: 'Name (lowercase, no special characters)',
  required: true,
  defaultValue: '',
}
const title: Field = { name: 'title', type: 'text', label: 'Title', required: true }

const arrayFields: Field = {
  name: 'fields',
  type: 'blocks',
  blocks: [
    CustomMessageBlock,
    CustomNumberBlock,
    DropdownBlock,
    NifBlock,
    RadioButtonBlock,
    CustomTextfieldBlock,
    AddressBlock,
    BirthCertificateBlock,
    ContactBlock,
    IdBlock,
    RequestorBlock,
    HeaderBlock,
    SelectBlock,
    NationalityBlock,
    PhoneNumberBlock,
    PreLoadExample1Block,
    DateOrYearPickerBlock,
    TextAreaBlock,
    TextBoxBlock,
    TitleBlock,
    SelectBlock,
    SelectWithApiBlock,
    IdentificationDataBlock,
    LocationBlock,
    FlexRadioButtonGroupBlock,
    PriorWeddingChildrenDataBlock,
    TwinBirthDataBlock,
    SecondParentBlock,
  ],
  labels: { singular: 'Field', plural: 'Fields' },
}

export const GroupBlock: Block = { slug: 'group', fields: [name, title, arrayFields] }
