'use client'
import React from 'react'
import Image, { StaticImageData } from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

type Card = {
  images: StaticImageData[]
  title: string
  clicked?: boolean
}

interface ClickableImageCardProps {
  cards: Card[]
  clickable?: boolean
  onChange?: (clickedCard: Card) => void
}

const ClickableImageCard = ({ cards, clickable = true, onChange }: ClickableImageCardProps) => {
  const [cardsToDisplay, setCardsToDisplay] = React.useState(cards)

  const handleClick = (clickedCard: Card) => {
    if (!clickable) return
    const updatedCards = cardsToDisplay.map((card) =>
      card.title === clickedCard.title ? { ...card, clicked: true } : { ...card, clicked: false },
    )
    setCardsToDisplay(updatedCards)
    if (onChange) {
      onChange(clickedCard)
    }
  }

  return (
    <div className="flex flex-row justify-start gap-8 ">
      {cardsToDisplay.map((card, index) => (
        <div
          key={index}
          onClick={() => handleClick(card)}
          className={`flex flex-col items-center gap-2 ${!clickable ? '' : 'cursor-pointer'}`}
        >
          <div
            className={
              card.clicked
                ? 'flex border-2 border-[#034AD8] rounded p-6'
                : 'flex border-2 border-[#CDD2DC] rounded p-6'
            }
          >
            {card.images.map(
              (image: string | StaticImport, index: React.Key | null | undefined) => (
                <Image key={index} src={image} alt={card.title} width="45" height="45" />
              ),
            )}
          </div>
          <p className={card.clicked ? 'text-[#034AD8]' : 'text-black'}>{card.title}</p>
        </div>
      ))}
    </div>
  )
}

export default ClickableImageCard
