import { Title } from '@/blocks/Form/Title'
import { Icon } from '@ama-pt/agora-design-system'

export const CertificatePreviewError = () => (
  <div className="flex flex-col justify-center items-center rounded-[16px] min-w-[800px] h-[1100px] gap-16 bg-[#B20917]">
    <div className="flex flex-col gap-2">
      <Title label="Indisponível." className="font-semibold text-white text-center" />
      <Title
        label="Não foi possível carregar o ficheiro."
        className="font-light text-white text-center"
      />
    </div>

    <Icon name="agora-line-alert-triangle" dimensions="xxxl" className="fill-white" />
  </div>
)
