
import { BirthCertificateData } from '../BirthCertificateData'
import { BirthConsultation } from '../BirthConsultation'
import { Location } from '../Location'
import { Checkbox } from '../Checkbox'
import { FlexRadioButtonGroup } from '../Cidadao/FlexRadioButtonGroup'
import { PriorWeddingChildrenData } from '../Cidadao/PriorWeddingChildrenData'
import { SecondParent } from '../Cidadao/SecondParent'
import { TwinBirthData } from '../Cidadao/TwinBirthData'
import { ContactData } from '../ContactData'
import { Country } from '../Country'
import { CustomMessage } from '../CustomMessage'
import { CustomNumber } from '../CustomNumber'
import { DateOrYearPicker } from '../DateOrYearPicker'
import { Email } from '../Email'
import { Header } from '../Header'
import { IdData } from '../IdData'
import { IdentificationData } from '../IdentificationData'
import { Message } from '../Message'
import { Nationality } from '../Nationality'
import { Nif } from '../Nif'
import { NumberInput } from '../NumberInput'
import { ParentAddress } from '../Address/ParentAddress'
import { ParentIdentification } from '../ParentIdentification'
import { PhoneNumber } from '../PhoneNumber'
import { PreLoadExample1 } from '../PreloadExample1'
import { RadioButtons } from '../RadioButtonGroup'
import { RequestorData } from '../RequestorData'
import { Select } from '../Select'
import { SelectWithApi } from '../SelectWithAPI'
import { State } from '../State'
import { Textarea } from '../Textarea'
import { TextBox } from '../TextBox'
import { Title } from '../Title'
import { CitizenshipCardRequest } from '../Cidadao/CitizenshipCardRequest'
import { AddressData } from '../Address'
import FormSpace from '../FormSpace'

export const fields = {
  customMessage: CustomMessage,
  checkbox: Checkbox,
  customNumber: CustomNumber,
  country: Country,
  email: Email,
  header: Header,
  message: Message,
  number: NumberInput,
  select: Select,
  state: State,
  textBox: TextBox,
  textarea: Textarea,
  nif: Nif,
  selectWithApi: SelectWithApi,
  addressData: AddressData,
  birthCertificateData: BirthCertificateData,
  contactData: ContactData,
  idData: IdData,
  requestorData: RequestorData,
  customtext: TextBox,
  nationality: Nationality,
  phoneNumber: PhoneNumber,
  radioButtons: RadioButtons,
  flexRadioButtonGroup: FlexRadioButtonGroup,
  priorWeddingChildrenData: PriorWeddingChildrenData,
  citizenshipCardRequest: CitizenshipCardRequest,
  twinBirthData: TwinBirthData,
  secondParent: SecondParent,
  preLoadExample1: PreLoadExample1,
  birthdate: DateOrYearPicker,
  birthplace: Location,
  customtextarea: Textarea,
  title: Title,
  formspace: FormSpace,
  parentaddress: ParentAddress,
  identificationData: IdentificationData,
  birthconsultation: BirthConsultation,
  parentidentification: ParentIdentification,
}
