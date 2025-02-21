import { getGetStepInfoServiceOrder } from '.'
import { countryOptions } from '@/blocks/Form/Country/options'

const getFieldValue = (formData: any[], field: string): string => {
    const fieldItem = formData.find((item: { field: string }) => item.field === field)
    return fieldItem ? fieldItem.value : ''
}

export const getIdentificationData = async (serviceId: string, userId: string, orderId: string) => {
    try {
        const identificationStepData = await getGetStepInfoServiceOrder({
            userId,
            serviceId,
            stepIndex: 1,
            orderId,
        })

        const identificationFormData = JSON.parse(identificationStepData.formdata)

        const cvtNome = getFieldValue(identificationFormData, 'cvtNome')
        const cvtDocumento = getFieldValue(identificationFormData, 'cvtDocumento')
        const cvtNrDocumento = getFieldValue(identificationFormData, 'cvtNrDocumento')
        const cvtNIF = getFieldValue(identificationFormData, 'cvtNIF')

        const cvtMorada = getFieldValue(identificationFormData, 'cvtMorada')
        const cvtCodPostal = getFieldValue(identificationFormData, 'cvtCodPostal')
        const cvtLocalidade = getFieldValue(identificationFormData, 'cvtLocalidade')
        const cvtEstrangeira = getFieldValue(identificationFormData, 'cvtEstrangeira')
        const cvtResidencia = getFieldValue(identificationFormData, 'cvtResidencia')
        const country = countryOptions.find((option) => option.value === cvtResidencia)
        const countryLabel = country ? country.label : ''

        const addressData =
            cvtResidencia === 'PT'
                ? [cvtMorada, cvtCodPostal, cvtLocalidade].join(', ')
                : [cvtEstrangeira, countryLabel].join(', ')


        const cvtEmail = getFieldValue(identificationFormData, 'cvtEmail')
        const cvtTelefone = getFieldValue(identificationFormData, 'cvtTelefone')

        const data = {
            name: cvtNome,
            document: cvtDocumento,
            documentNr: cvtNrDocumento,
            nif: cvtNIF,
            address: addressData,
            email: cvtEmail,
            phone: cvtTelefone
        }

        return data
    } catch (e) {
        console.error('Error fetching summary data:', e)
        throw new Error('Failed to fetch summary data')
    }
}

export const getBirthCertificateData = async (serviceId: string, userId: string, orderId: string) => {
    try {
        const birthCertificateStepData = await getGetStepInfoServiceOrder({
            userId,
            serviceId,
            stepIndex: 2,
            orderId,
        })

        const birthCertificateFormData = JSON.parse(birthCertificateStepData.formdata)

        const cvtNomeBirthCertificate = getFieldValue(birthCertificateFormData, 'cvtNomeBirthCertificate')
        const cvtDocumentoBirthCertificate = getFieldValue(birthCertificateFormData, 'cvtDocumentoBirthCertificate')
        const cvtNrDocumentoBirthCertificate = getFieldValue(birthCertificateFormData, 'cvtNrDocumentoBirthCertificate')
        const cvtDigitoIdentitifcacaoBirthCertificate = getFieldValue(birthCertificateFormData, 'cvtNrDocumentoBirthCertificate')
        
        const cvtNumeroAnoRegistoBirthCertificate = getFieldValue(birthCertificateFormData, 'cvtNumeroAnoRegistoBirthCertificate')
        const cvtDataExataBirthCertificate = getFieldValue(birthCertificateFormData, 'cvtDataExataBirthCertificate')
        const cvtAnoNascimentoBirthCertificate = getFieldValue(birthCertificateFormData, 'cvtAnoNascimentoBirthCertificate')
        const cvtNomePaiBirthCertificate = getFieldValue(birthCertificateFormData, 'cvtNomePaiBirthCertificate')
        const cvtNomeMaeBirthCertificate = getFieldValue(birthCertificateFormData, 'cvtNomeMaeBirthCertificate')
        const cvtInfoAdicionalBirthCertificate = getFieldValue(birthCertificateFormData, 'cvtInfoAdicionalBirthCertificate')
        
        const data = {
            nameBirthCertificate: cvtNomeBirthCertificate,
            documentBirthCertificate: cvtDocumentoBirthCertificate,
            documentNrBirthCertificate: cvtNrDocumentoBirthCertificate,
            idDigitBirthCertificate: cvtDigitoIdentitifcacaoBirthCertificate,
            registryYearBirthCertificate: cvtNumeroAnoRegistoBirthCertificate,
            exactDateBirthCertificate: cvtDataExataBirthCertificate,
            birthYearBirthCertificate: cvtAnoNascimentoBirthCertificate,
            fatherNameBirthCertificate: cvtNomePaiBirthCertificate,
            motherNameBirthCertificate: cvtNomeMaeBirthCertificate,
            additionalInfoBirthCertificate: cvtInfoAdicionalBirthCertificate
        }

        return data
    } catch (e) {
        console.error('Error fetching summary data:', e)
        throw new Error('Failed to fetch summary data')
    }
}