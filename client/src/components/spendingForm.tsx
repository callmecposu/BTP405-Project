import React, {useState} from 'react'
import { Input, Select, SelectItem, Textarea, Button } from '@nextui-org/react'

export default function SpendingForm({type, source, setSource, date, setDate, amount, setAmount, category, setCategory, tags, setTags, note, setNote, handleSubmit}: any) {
    const [newTag, setNewTag] = useState('')

    const handleAddTag = () => {
        if (newTag.trim() === '') {
            return;
        }

        if (tags.includes(newTag)) {
            return;
        }

        setTags([...tags, newTag]);
        setNewTag('');
    }

    const handleDeleteTag = (tag: string) => {
        setTags(tags.filter((t: string) => t !== tag))
    }
    
    return (
        <div className='p-3'>
            <h1 className='text-2xl font-medium ml-3'>{type == "add" ? "Add New" : "Edit"} Spending Record</h1>
            <div className='flex flex-col mt-7'>
                <div className='flex w-full flex-wrap'>
                    <div className='flex-1 mx-2'>
                        <div className='mb-2 ml-2'>Source *</div>
                        <Input
                            placeholder="Where did you spend?"
                            type="text"
                            className="border border-gray-400 mb-4 rounded-xl px-1 min-w-[125px] w-full max-w-[400px] bg-white"
                            value={source}
                            required
                            onChange={(e) => setSource(e.target.value)}
                        />
                    </div>
                    <div className='flex-1'>
                        <div className='mb-2 ml-2'>Date *</div>
                        <Input
                            placeholder="When did you send?"
                            type="date"
                            className="border border-gray-400 mb-4 rounded-xl px-1 min-w-[125px] w-full max-w-[400px] bg-white"
                            value={date}
                            required
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className='flex w-full flex-wrap'>
                    <div className='flex-1 mx-2'>
                        <div className='mb-2 ml-2'>Amount *</div>
                        <Input
                            placeholder="How much did you spend?"
                            type="number"
                            className="border border-gray-400 mb-4 rounded-xl px-1 min-w-[125px] w-full max-w-[400px] bg-white"
                            value={amount}
                            required
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div className='flex-1'>
                        <div className='mb-2 ml-2'>Category *</div>
                        <Select
                            placeholder="Category"
                            aria-label="Category"
                            value={category}
                            required
                            className="border border-gray-400 rounded-xl px-1 w-1/3 bg-white w-full max-w-[400px] mb-4"
                            classNames={{
                                selectorIcon: "right-0 top-1/3", 
                                listboxWrapper: " bg-white rounded-md shadow-md w-max",
                            }}
                            onChange={(value) => setCategory(value.target.value)}
                            selectedKeys={category ? [category] :  []}
                        >
                            <SelectItem key="Grocery" className="my-2">Grocery</SelectItem>
                            <SelectItem key="Transport" className="my-2">Transport</SelectItem>
                            <SelectItem key="Health" className="my-2">Health</SelectItem>
                            <SelectItem key="Restaurants" className="my-2">Restaurants</SelectItem>
                            <SelectItem key="Entertainment" className="my-2">Entertainment</SelectItem>
                            <SelectItem key="Bills" className="my-2">Bills</SelectItem>
                            <SelectItem key="Others" className="my-2">Other</SelectItem>
                        </Select>
                    </div>
                </div>
                <div className='mb-2 ml-2'>Tags</div>
                <div className="flex h-10 mb-4">
                    <Input
                        placeholder="Add a tag"
                        type="text"
                        className="border border-gray-400 mb-4 rounded-xl h-10 px-1 min-w-[125px] w-full max-w-[400px] bg-white"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                    />
                    <button
                        className="ml-2 px-3 py-1 bg-primary text-white rounded-md"
                        onClick={handleAddTag}
                    >
                        Add
                    </button>
                </div>
                <div className="flex flex-wrap mb-5">
                    {tags?.map((tag: string) => (
                        <div
                            key={tag}
                            className="flex items-center bg-gray-200 rounded-md px-2 py-1 m-1"
                        >
                            <span className="mr-1">{tag}</span>
                            <button
                                className="text-gray-800 text-xl ml-1"
                                onClick={() => handleDeleteTag(tag)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22M8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 1 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 1 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06" clip-rule="evenodd"/></svg>
                            </button>
                        </div>
                    ))}
                </div>
                <div className='mb-2 ml-2'>Notes</div>
                <Textarea
                    placeholder="Short note may help to reflect on your spendings later"
                    className="border border-gray-400 mb-4 rounded-xl px-1 min-w-[125px] w-full max-w-[400px] bg-white"
                    value={note}
                    maxRows={5}
                    onChange={(e) => setNote(e.target.value)}
                />
                <Button
                    className={`${(source?.trim() === '' || date?.trim() === '' || parseFloat(amount) <= 0 || category?.trim() === '') ? 'bg-gray-300' : 'bg-primary'} text-white rounded-md w-max px-6 mt-2 text-lg cursor-pointer py-2`}
                    onClick={() => {handleSubmit();}}
                    disabled={source?.trim() === '' || date?.trim() === '' || parseFloat(amount) <= 0 || category?.trim() === ''}
                >
                    {type == "add" ? "Add" : "Update"} Record
                </Button>
            </div>
        </div>
    )
}