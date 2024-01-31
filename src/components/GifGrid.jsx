import { useEffect, useState } from "react"
import { getGifs } from "../helpers/getGifs"
import { GifItem } from "./GifItem"
import { useFetchGifs } from "../hooks/useFetchGIfs"

export const GifGrid = ({ category }) => {


    const { images, isLoading } = useFetchGifs(category);

    return (
        <>
        {
            isLoading && (<h2>Cargando...</h2>)
        }
            <div>
                <h3>{category}</h3>

                <div className="card-grid">
                    {
                        images.map((image) => (
                            <GifItem
                                key={image.id}
                                {...image}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

