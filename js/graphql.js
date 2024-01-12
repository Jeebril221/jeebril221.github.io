const queryUser = `
{
  user {
    login
    firstName
    lastName
    email
    attrs
    campus
    auditRatio
  }
  xp: transaction_aggregate(
    where: {
      _and: [
        { type: { _eq: "xp" } },
        { path: { _ilike: "%dakar/div-01%" } },
        { path: { _nlike: "%/piscine-js/%" } }
      ]
    }
  ) {
    aggregate {
      sum {
        amount
      }
    }
  }
}
`

const lastBigProjects =  `
{
    user{
    transactions(where: {
      type: {_like: "xp"}
    }
    limit: 7)
    {
      amount
      path
    }
  
  }
}
`

//recup les exos validés avec leurs xps
const query3 = `
{
  user {
    xps(
      where: {
        _and: [
          { path: { _nlike: "%/piscine-js/%" } },
          { path: { _nlike: "%/piscine-go/%" } },
          { path: { _nlike: "%/checkpoint/%" } }
        ]
      },
      order_by: { amount: desc }
      limit: 10
    ) {
      path
      amount
    }
  }
}
`

//User up down ration
const query4 = `
{
    user {
      upAmount: transactions_aggregate(where: {type: {_eq: "up"}}) {
        aggregate {
          sum {
            amount
          }
        }
      }
      downAmount: transactions_aggregate(where: {type: {_eq: "down"}}) {
        aggregate {
          sum {
            amount
          }
        }
      }
    }
}
`

//level amount
const query5 = `
{
  transaction(
            where: {
          _and: [
            { type: { _eq: "level" } },
            { path: { _nlike: "%/piscine-js/%" } },
            { path: { _nlike: "%/piscine-go/%" } }
          ]
        }
    order_by:{amount: desc}
    limit: 1
  ) {
    amount
  }
}
` 
