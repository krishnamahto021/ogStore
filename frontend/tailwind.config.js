module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        otherText: ["Montserrat"],
      },
      textColor: {
        textOne: "#212529",
        textTwo: "#DEE2E6",
        textThree: "#F8F9FA",
        textFour: "#6C757D",
        textFive: "#ADB5BD",
      },
      backgroundColor: {
        bgOne: "#F8F9FA",
        bgTwo: "#212529",
        bgThree: "#DEE2E6",
        bgFour: "#495057",
      },
      backgroundImage: {
        authImage:
          "url('https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c25lYWtlcnN8ZW58MHx8MHx8fDA%3D')",
      },
    },
  },
  plugins: [],
};
