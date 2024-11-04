## GraphQL Usage


```graphql
############ Auth ############

# GraphQL Mutation: Login
mutation Login {
  login(email: "johndoe@example.com", password: "securePassword123") {
    success
    message
    token
  }
}

############ User ############

# Query: Get All Users
query FindAllUsers {
  findAllUsers {
    success
    message
    list {
      id
      name
      email
    }
  }
}

# Query: Find User by ID
query FindUserById {
  findUserById(input: { id: 1 }) {
    success
    message
    id
    name
    email
  }
}

# Mutation: Create User
mutation CreateUser {
  createUser(input: { name: "John Doe", email: "johndoe@example.com", password: "securePassword123" }) {
    success
    message
    id
    name
    email
  }
}

# Mutation: Update User
mutation UpdateUser {
  updateUser(input: { id: 1, name: "John Updated 2", email: "johnupdated@example.com" }) {
    success
    message
    id
    name
    email
  }
}

# Mutation: Delete User
mutation DeleteUser {
  deleteUser(id: 7) {
    success
    message
    id
    name
    email
  }
}

############ Product ############

# Query: Get All Products
query GetAllProducts {
  getAllProducts {
    success
    message
    list {
      id
      name
      description
      price
      rentPrice
      totalViews
      rentDuration
      status
      user {
        id
        name
        email
      }
      categories {
        id
        name
      }
    }
  }
}

# Query: Get Product by ID
query GetProduct {
  getProduct(id: 1) {
    success
    message
    id
    name
    description
    price
    rentPrice
    totalViews
    rentDuration
    status
    user {
      id
      name
      email
    }
    categories {
      id
      name
    }
  }
}

# Query: Get All Own Products
query GetAllOwnProducts {
  getAllOwnProducts {
    success
    message
    list {
      id
      name
      description
      price
      rentPrice
      totalViews
      rentDuration
      status
      user {
        id
        name
        email
      }
      categories {
        id
        name
      }
    }
  }
}

# Mutation: Create Product
mutation CreateProduct {
  createProduct(
    input: {
      name: "Sample Product"
      description: "A detailed description of the sample product."
      price: 100.50
      rentPrice: 15.75
      rentDuration: perDay
      status: available
      categoryIds: [1, 2]
    }
  ) {
    success
    message
    id
    name
    description
    price
    rentPrice
    totalViews
    rentDuration
    status
    user {
      id
      name
      email
    }
    categories {
      id
      name
    }
  }
}

# Mutation: Update Product
mutation UpdateProduct {
  updateProduct(
    id: 1
    input: {
      name: "Updated Product Name"
      description: "Updated description"
      price: 120.00
      rentPrice: 20.00
      rentDuration: perMonth
      status: lent
      categoryIds: [2, 3]
    }
  ) {
    success
    message
    id
    name
    description
    price
    rentPrice
    totalViews
    rentDuration
    status
    user {
      id
      name
      email
    }
    categories {
      id
      name
    }
  }
}

# Mutation: Delete Product
mutation DeleteProduct {
  deleteProduct(id: 12) {
    success
    message
  }
}

# Mutation: Increment Product View Count
mutation ViewProduct {
  viewProduct(id: 1) {
    success
    message
    id
    name
    totalViews
  }
}


############ Category ############

# Query: Get All Categories
query GetAllCategories {
  getAllCategories {
    success
    message
    list {
      id
      name
      products {
        id
        name
        description
        price
        rentPrice
        totalViews
        rentDuration
        status
      }
    }
  }
}

############ Transaction ############

# Query: Get User Transactions
query GetUserTransactions {
  getUserTransactions {
    success
    message
    borrowed {
      id
      transactionDate
      rentalDateStart
      rentalDateEnd
      transactionType
      user {
        id
        name
        email
      }
      product {
        id
        name
        price
        rentPrice
        description
      }
    }
    lent {
      id
      transactionDate
      rentalDateStart
      rentalDateEnd
      transactionType
      user {
        id
        name
        email
      }
      product {
        id
        name
        price
        rentPrice
        description
      }
    }
    sold {
      id
      transactionDate
      rentalDateStart
      rentalDateEnd
      transactionType
      user {
        id
        name
        email
      }
      product {
        id
        name
        price
        rentPrice
        description
      }
    }
    bought {
      id
      transactionDate
      rentalDateStart
      rentalDateEnd
      transactionType
      user {
        id
        name
        email
      }
      product {
        id
        name
        price
        rentPrice
      }
    }
  }
}

# Mutation: Buy Product
mutation {
  buyProduct(data: { productId: 5 }) {
    success
    message
    id
    transactionDate
    transactionType
    product {
      id
      name
      price
    }
  }
}

# Mutation: Rent Product
mutation {
  rentProduct(data: { productId: 9, rentalDateStart: "2024-11-05T00:00:00.000Z", rentalDateEnd: "2024-11-10T00:00:00.000Z" }) {
    success
    message
    id
    transactionDate
    rentalDateStart
    rentalDateEnd
    transactionType
    product {
      id
      name
      rentPrice
    }
  }
}

```