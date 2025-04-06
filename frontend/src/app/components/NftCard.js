const NftCard = ({ image, id, title, address, description, attributes }) => {
    const imageUrl = image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSROpCcjxp8hU2xCYxKwoKW1eyDkJS20-moxA&s'
    return (
        <div className="w-300 max-w-[300px] mr-3 mb-4 h-auto rounded-md border-2xl hover:shadow-yellow-200 hover:-translate-y-1 shadow-lg shadow-cyan-500/50 grid self-center text-center border-amber-200 bg-gradient-to-r from-blue-900 to-blue-500 p-3 m-auto space-y-2">
            <img className="w-300 h-300 max-h-[200px] object-cover rounded-t-md" key={id} src={imageUrl} alt={title} />
            <div className="p-3 flex flex-col h-full">
                <div className="flex mb-3 justify-between">
                    <div className="flex-grow">
                        <h3 className="text-xl font-bold">{title}</h3>
                        <p className="text-sm text-gray-300">{`${id.slice(0, 4)}...${id.slice(id.length - 4)}`}</p>
                    </div>
                    <div className="flex mr-3">
                        <a target="_blank" rel="noopener noreferrer" className="text-blue-700" href={`https://etherscan.io/token/${address}`}>
                            {`${address.slice(0, 4)}...${address.slice(address.length - 4)}`}
                        </a>
                    </div>
                </div>
                <p className="text-sm text-gray-200 flex-grow">
                    {description ? (description.length > 200 ? description.slice(0, 200) + "..." : description) : "No Description"}
                </p>
            </div>
            <div className="flex flex-wrap justify-center items-center p-3">
                {attributes?.length > 0 && attributes.map(attribute => {
                    return (
                        <div className="w-1/2 mb-2 flex justify-start flex-col" key={attribute.trait_type}>
                            <p className="mr-2 font-bold text-gray-200">{attribute.trait_type}:</p>
                            <p className="text-sm text-gray-100">{attribute.value}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default NftCard;
