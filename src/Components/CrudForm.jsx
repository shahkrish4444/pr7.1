import React, { useEffect, useState } from 'react'
 import states from './json.json'
import 'bootstrap/dist/css/bootstrap.min.css';

const Curdpr = () => {
    const initialInput = { name: '', email: '', password: '', confirmPassword: '', mobile: '', course: '', hobbies: '', gender: '', state: '', city: '', address: '' }

    const [input, setInput] = useState(initialInput)
    const [errors, setErrors] = useState(initialInput)
    const [cities, setCities] = useState([])
    const [editId, setEditId] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [data, setData] = useState(() => {
        const localData = JSON.parse(localStorage.getItem('user-data'))
        if (localData) {
            return localData
        }
        return []
    })

    useEffect(() => {
        localStorage.setItem('user-data', JSON.stringify(data))
    }, [data])

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleOption = (e) => {
        const value = e.target.value
        const name = e.target.name

        setInput({ ...input, [name]: value })
        if (name === 'state') {
            getDistricts(value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const verify = validate()
        if (verify.name || verify.email || verify.password || verify.confirmPassword || verify.mobile || verify.course || verify.gender || verify.state || verify.city || verify.address || verify.hobbies) {
            setErrors(verify)
        } else {
            if (isEdit) {
                const oldData = [...data]
                oldData[editId] = input
                setData(oldData)
                setIsEdit(false)
            } else {
                setData([...data, input])
            }
            resetFields()
            e.target.reset()
        }
    }

    const resetFields = () => {
        setInput(initialInput)
        setCities([])
        setIsEdit(false)
    }

    const validate = () => {
        const errors = {}
        if (input.name.length < 1) {
            errors.name = 'Please Enter Name'
        }
        if (input.email.length < 1) {
            errors.email = 'Please Vaild Email'
        }
        if (input.password.length < 1) {
            errors.password = 'Please Enter Password'
        }
        if (input.confirmPassword.length < 1) {
            errors.confirmPassword = 'Please Enter Confirm Password'
        } else if (input.confirmPassword !== input.password) {
            errors.confirmPassword = 'Confirm Password Is Not match With Password'
        }
        if (input.mobile.length < 1) {
            errors.mobile = 'Please Enter Mobile'
        } else if (input.mobile.length !== 10) {
            errors.mobile = 'Mobile Number Not Correct'
        }
        if (input.course.length < 1) {
            errors.course = 'Please Enter Course'
        }
        if (input.gender.length < 1) {
            errors.gender = 'Select Your Gender'
        }
        if (input.state.length < 1) {
            errors.state = 'Select Your State'
        }
        if (input.city.length < 1) {
            errors.city = 'Select Your City'
        }
        if (input.hobbies.length < 1) {
            errors.hobbies = 'Please Enter Hobbies'
        }
        if (input.address.length < 1) {
            errors.address   = 'Please Enter Address'
        }
        return errors
    }

    const handleEdit = (id) => {
        setInput({ ...data[id], id })
        setEditId(id)
        setIsEdit(true)
    }

    const handleDelete = (id) => {
        const oldData = [...data]
        oldData.splice(id, 1)
        setData(oldData)
    }

    useEffect(() => {
        getDistricts(input.state)
    }, [isEdit])

    const getDistricts = (state) => {
        states.states.forEach(e => {
            if (e.state === state) {
                setCities(e.districts)
            }
        })
    }

    // drop down
    const DropDown = ({ name, input, handleOption, states }) => {
        return (
            <select name={name} className='block w-full rounded-md border-0 py-1.5 px-3 ' value={input} onChange={handleOption} disabled={states.length < 1 ? true : false}>
                <option value="">-- select {name} --</option>
                {
                    states.map((state, i) => <option key={i} value={name === 'state' ? state.state : state}>{name === 'state' ? state[name] : state}</option>)
                }
            </select>
        )
    }
    // table
    const Table = ({ data, handleEdit, handleDelete, isEdit }) => {
        return (
    
            <div className=" flex flex-wrap px-3">
                <table className="table">
                    <thead className="text-xs  uppercase border-b dark:border-gray-700 bg-indigo-500">
                        <tr>
                            <th scope="col" className="px-6 py-3 border-r border-gray-500">Name</th>
                            <th scope="col" className="px-6 py-3 border-r border-gray-500">Email</th>
                            <th scope="col" className="px-6 py-3 border-r border-gray-500">Password</th>
                            <th scope="col" className="px-6 py-3 border-r border-gray-500">Confirm Password</th>
                            <th scope="col" className="px-6 py-3 border-r border-gray-500">Gender</th>
                            <th scope="col" className="px-6 py-3 border-r border-gray-500">Mobile</th>
                            <th scope="col" className="px-6 py-3 border-r border-gray-500">Course</th>
                            <th scope="col" className="px-6 py-3 border-r border-gray-500">State</th>
                            <th scope="col" className="px-6 py-3 border-r border-gray-500">City</th>
                            <th scope="col" className="px-6 py-3 border-r border-gray-500">Hobbies</th>
                            <th scope="col" className="px-6 py-3 border-r border-gray-500">Address</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((e, i) =>
                            <tr className="bg-white border-b" key={i}>
                                <td className="px-6 py-4 border-r border-gray-400">{e.name}</td>
                                <td className="px-6 py-4 border-r border-gray-400">{e.email}</td>
                                <td className="px-6 py-4 border-r border-gray-400">{e.password}</td>
                                <td className="px-6 py-4 border-r border-gray-400">{e.confirmPassword}</td>
                                <td className="px-6 py-4 border-r border-gray-400">{e.gender}</td>
                                <td className="px-6 py-4 border-r border-gray-400">{e.mobile}</td>
                                <td className="px-6 py-4 border-r border-gray-400">{e.course}</td>
                                <td className="px-6 py-4 border-r border-gray-400">{e.state}</td>
                                <td className="px-6 py-4 border-r border-gray-400">{e.city}</td>
                                <td className="px-6 py-4 border-r border-gray-400">{e.hobbies}</td>
                                <td className="px-6 py-4 border-r border-gray-400">{e.address}</td>
                                <td className="px-6 py-4">
                                    <button className='text-white bg-warning px-3 py-1 rounded ms-4 mb-2' onClick={() => handleEdit(i)}>Edit</button>
                                    <button disabled={isEdit} className='text-white bg-primary ms-3 px-3 py-1 rounded ml-2' onClick={() => handleDelete(i)}>Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {data.length < 1 ? <h3 className='text-lg text-gray-600 text-center mt-3'>No data found</h3> : ''}
            </div>
    
        )
    }

    return (
        <>
            <div className="container py-10 bg-info">
                <h1 className='text-center mb-5'>Registration Form</h1>
                <div className="px-5 text-center">
                    <form className="" onSubmit={handleSubmit} action="#" method="POST">
                        <div className='d-flex flex-wrap items-end'>
                            <div className='w-1/2 px-3 col-6'>
                                <label htmlFor="name" className='fs-5 fw-bolder' >Name</label>
                                <div className="mt-2">
                                    <input id="name" name="name" type="text" autoComplete="name" value={input.name} onChange={handleChange} />
                                    <p className='text-red-400 text-sm'>{errors.name}</p>
                                </div>
                            </div>

                            <div className='w-1/2 px-3 col-6'>
                                <label htmlFor="email" className="block fs-5 fw-bolder">Email address</label>
                                <div className="mt-2">
                                    <input id="email" name="email" type="email" autoComplete="email" className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={input.email} onChange={handleChange} />
                                    <p className='text-red-400 text-sm'>{errors.email}</p>
                                </div>
                            </div>

                            <div className='w-1/2 px-3 col-6'>
                                <label htmlFor="password" className="block fs-5 fw-bolder">Password</label>
                                <div className="mt-2">
                                    <input id="password" name="password" type="password" autoComplete="current-password" value={input.password} onChange={handleChange} />
                                    <p className='text-red-400 text-sm'>{errors.password}</p>
                                </div>
                            </div>

                            <div className='w-1/2 px-3 col-6'>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900 fs-5 fw-bolder">Confirm Password</label>
                                <div className="mt-2">
                                    <input id="confirm-password" name="confirmPassword" type="password" value={input.confirmPassword} onChange={handleChange} />
                                    <p className='text-red-400 text-sm'>{errors.confirmPassword}</p>
                                </div>
                            </div>

                            <div className='w-1/3 px-3 col-6'>
                                <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-900 fs-5 fw-bolder">Mobile no.</label>
                                <div className="mt-2">
                                    <input id="mobile" name="mobile" type="number" value={input.mobile} onChange={handleChange} />
                                    <p className='text-red-400 text-sm'>{errors.mobile}</p>
                                </div>
                            </div>

                            <div className='w-1/3 px-3 col-6'>
                                <label htmlFor="course" className="block text-sm font-medium leading-6 text-gray-900 fs-5 fw-bolder">Course</label>
                                <div className="mt-2">
                                    <select name='course' value={input.course} onChange={handleChange} >
                                        <option value="">--select course--</option>
                                        <option value="be">B.TECH</option>
                                        <option value="bcom">B.COM</option>
                                        <option value="bca">BCA</option>
                                        <option value="ba">BBA</option>
                                    </select>
                                    <p className='text-red-400 text-sm'>{errors.course}</p>
                                </div>
                            </div>

                            <div className='w-1/3 px-3 col-6'>
                                <label htmlFor="gender" className='fs-5 '>Gender</label>
                                <div className="mt-2">
                                    Male
                                    <input id="male" name="gender" value='male' type="radio" onChange={handleChange} className='me-5'/>
                                    Female
                                    <input id="female" name="gender" value='female' type="radio" onChange={handleChange} />
                                    <p className='text-red-400 text-sm'>{errors.gender}</p>
                                </div>
                            </div>

                            <div className='w-1/3 px-3 col-6'>
                                <label htmlFor="state">State</label>
                                <div className="mt-2">
                                    <DropDown input={input.state} handleOption={handleOption} states={states.states} name='state' />
                                    <p className='text-red-400 text-sm'>{errors.state}</p>
                                </div>
                            </div>

                            <div className='w-1/3 px-3 col-6'>
                                <label htmlFor="city">City</label>
                                <div className="mt-2">
                                    <DropDown input={input.city} handleOption={handleOption} name='city' states={cities} />
                                    <p className='text-red-400 text-sm'>{errors.city}</p>
                                </div>
                            </div>

                            <div className='w-1/3 px-3 col-6'>
                                <label htmlFor="hobbies">Hobbies</label>
                                <div className="mt-2">
                                    <input id="hobbies" name="hobbies" type="text" autoComplete="hobbies" className="block w-full rounded-md border-1 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={input.hobbies} onChange={handleChange} />
                                    <p className='text-red-400 text-sm'>{errors.hobbies}</p>
                                </div>
                            </div>

                            <div className="w-1/3 px-3 col-6">
                                <label htmlFor="address">Address</label>
                                <div className="mt-2">
                                    <textarea id="address" name="address" rows="2" className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={input.address} onChange={handleChange}></textarea>
                                    <p className='text-red-400 text-sm'>{errors.address}</p>
                                </div>
                            </div>
                        </div>
                        <div className='mt-6 px-3'>
                            <button type="submit" className='bg-info  me-2'>{isEdit ? 'Update' : 'Submit'}</button>

                            {/* <input type='reset' className='bg-light ' value={isEdit ? 'Cancel' : 'Reset'} onClick={resetFields}  /> */}
                        </div>
                    </form>
                </div>

                <Table data={data} handleEdit={handleEdit} handleDelete={handleDelete} isEdit={isEdit} />
            </div>
        </>
    )
}

export default Curdpr