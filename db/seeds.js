const mongoose = require('mongoose')
const Book = require('../api/models/book')
const User = require('../api/models/user')
const config = require('../nodemon.json')

// Not sure the best way to add the passwords in this file.
// Tried them unencrypted and that caused problems.

const reset = async () => {
  mongoose.connect(config.env.MONGO_DB_CONNECTION, { useNewUrlParser: true })
  await Book.deleteMany() // Deletes all records
  await User.deleteMany()
  const books = Book.create([
    {
      title: 'The Colour of Magic',
      published: 1983,
      authors: [
        {
          name: 'Sir Terry Pratchett',
          dob: '04-28-1948'
        }
      ]
    },
    {
      title: 'Stardust',
      published: 1997,
      authors: [
        {
          name: 'Neil Gaiman',
          dob: '11-10-1960'
        }
      ]
    },
    {
      title: 'Good Omens: The Nice and Accurate Prophecies of Agnes Nutter, Witch',
      published: 1990,
      authors: [
        {
          name: 'Neil Gaiman',
          dob: '11-10-1960'
        },
        {
          name: 'Sir Terry Pratchett',
          dob: '04-28-1948'
        }
      ]
    }
  ])
  const saltRounds = 10
  const users = await User.create([ 
    {
      username: "user",
      password: "$2b$10$uudM8Q/k8qXrsW99Puwj.evV.0maEhkh2f68/RYcCLdmmmyy7SANS"
    }, 
    {
      username: "superuser",
      password: "$2b$10$tpsmrtGuaoVnD5SoI5qVb.ioGntIx4GcwtWo.hEH1Z2to0NctJwni",
      admin: true
    }, 
  ])

  return(books, users)
}

reset().catch(console.error).then((response) => {
  console.log(`Seeds successful! ${response.length} records created.`)
  return mongoose.disconnect()
})