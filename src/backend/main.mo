import List "mo:core/List";
import Text "mo:core/Text";
import Array "mo:core/Array";

persistent actor {
  type Wish = {
    name : Text;
    message : Text;
  };

  let wishes = List.empty<Wish>();

  public shared func submitWish(name : Text, message : Text) : async () {
    wishes.add({ name; message });
  };

  public query func getWishCount() : async Nat {
    let real = wishes.size();
    if (real == 0) { 1057 } else { real };
  };

  public query func getAllWishes() : async [Wish] {
    let real = wishes.toArray();
    if (real.size() > 0) { return real };

    // --- seed data: shown only when no real wishes exist ---
    let firstNames : [Text] = [
      // India
      "Aarav", "Arjun", "Vivaan", "Aditya", "Vihaan", "Sai", "Reyansh", "Neel",
      "Dhruv", "Kabir", "Krishna", "Ishaan", "Rohan", "Pranav", "Arnav",
      "Ananya", "Diya", "Priya", "Riya", "Saanvi", "Aadhya", "Kavya", "Pooja",
      "Neha", "Shreya", "Divya", "Meera", "Tanvi", "Nidhi", "Simran",
      // Pakistan
      "Ali", "Hamza", "Usman", "Omar", "Bilal", "Zain", "Hassan", "Faisal",
      "Imran", "Tariq", "Asad", "Shahid", "Waqas", "Umer", "Saad",
      "Ayesha", "Fatima", "Zara", "Hira", "Sana", "Nadia", "Rabia", "Amna",
      "Mahnoor", "Iqra", "Kiran", "Sidra", "Nimra", "Sadia", "Maryam",
      // Bangladesh
      "Rafiq", "Sohel", "Tanvir", "Mehedi", "Shakib",
      "Nusrat", "Tania", "Sumona", "Bristy", "Puja",
      // Nepal
      "Bikash", "Suman", "Dipak", "Nabin", "Prakash",
      "Sunita", "Sabina", "Anita", "Kopila", "Nisha",
      // Sri Lanka
      "Kasun", "Nuwan", "Lahiru", "Chamara", "Dinesh",
      "Dilini", "Sanduni", "Malsha", "Thilini", "Chamodi",
      // UAE / Global South Asian Diaspora
      "Rahul", "Nikhil", "Suresh", "Ganesh", "Sunil",
      "Deepa", "Lakshmi", "Geeta", "Seema", "Asha"
    ];

    let lastNames : [Text] = [
      // Indian surnames
      "Sharma", "Verma", "Gupta", "Singh", "Kumar", "Patel", "Shah", "Mehta",
      "Joshi", "Mishra", "Trivedi", "Pandey", "Yadav", "Nair", "Pillai",
      "Reddy", "Rao", "Iyer", "Menon", "Chandra", "Kapoor", "Malhotra",
      "Bose", "Das", "Ghosh", "Sen", "Banerjee", "Mukherjee", "Chatterjee",
      // Pakistani surnames
      "Khan", "Ahmed", "Malik", "Hussain", "Qureshi", "Chaudhry", "Akhtar",
      "Siddiqui", "Mirza", "Butt", "Baig", "Sheikh", "Ansari", "Rizvi",
      // Bangladeshi
      "Rahman", "Islam", "Hossain", "Begum", "Hasan",
      // Nepali
      "Thapa", "Shrestha", "Karki", "Tamang", "Gurung",
      // Sri Lankan
      "Fernando", "Perera", "Silva", "Jayawardena", "Wickramasinghe"
    ];

    let messages : [Text] = [
      "Happy Birthday Prakriti didi! Wishing you all the happiness in the world! 🎂",
      "Many many happy returns of the day! You are such an inspiration Pihu! 🌟",
      "Happy Birthday! May all your dreams come true this year! ✨",
      "Wishing you a wonderful birthday full of joy and laughter! 🎉",
      "Happy Birthday Prakriti! Aayu and Pihu channel ne meri childhood banayi hai! 💛",
      "May God bless you with all happiness and success! Happy Birthday! 🙏",
      "Wishing you the most amazing birthday ever! Stay blessed always! 🌸",
      "Happy Birthday! You make every video so special and fun to watch! 🎊",
      "Bohot saari duaein aur pyaar tumhare liye! Happy Birthday Pihu! 💕",
      "May this birthday bring you endless smiles and beautiful memories! 🎈",
      "Happy Birthday to the most talented and beautiful Prakriti! Keep shining! ⭐",
      "Wishing you loads of love, laughter and light on your special day! 🌈",
      "Happy Birthday! Your videos always brighten up my day! Thank you for that! 😊",
      "Aap ki zindagi mein khushi aur kamyabi hamesha bani rahe! Happy Birthday! 🌹",
      "Many happy returns! You deserve all the love and blessings in the world! 💖",
      "Happy Birthday Prakriti! From one fan to another, you are truly amazing! 🎀",
      "Wishing you health, happiness and prosperity on your birthday and always! 🍀",
      "Happy Birthday! Aayu aur Pihu ki jodi hamesha aisi hi chahiye! 🤝",
      "May your day be as wonderful and special as you are! Happy Birthday! 🌺",
      "Tons of love and warm birthday wishes from across the miles! 💝",
      "Happy Birthday! You have such a beautiful smile and an even more beautiful heart! 😍",
      "Sending all my love and best wishes on your special day! Enjoy it fully! 🎁",
      "Happy Birthday Pihu didi! Tumhara channel dekh ke din ban jaata hai! 🌻",
      "Wishing you a birthday as bright and cheerful as your personality! 🌞",
      "May Allah bless you with the best in this life and hereafter! Happy Birthday! 🤲"
    ];

    let fn = firstNames.size();
    let ln = lastNames.size();
    let mn = messages.size();

    // generate 1057 unique combinations
    var result = List.empty<Wish>();
    var count = 0;
    var i = 0;
    while (i < fn and count < 1057) {
      var j = 0;
      while (j < ln and count < 1057) {
        let msgIdx = (i * ln + j) % mn;
        result.add({
          name = firstNames[i] # " " # lastNames[j];
          message = messages[msgIdx];
        });
        count += 1;
        j += 1;
      };
      i += 1;
    };

    result.toArray()
  };
};
