module.exports = {
    // helper function for date formatting
    format_date: date => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
        date
      ).getFullYear()}`;
    },

    // helper function for pluralization 
    format_plural: (word, amount) => {
        if(amount !== 1) {
            return `${word}s`;
        }
        return word;
    },

    // helper function for URL format
    format_url: url => {
        return url
          .replace('http://', '')
          .replace('https://', '')
          .replace('www.', '')
          .split('/')[0]
          .split('?')[0];
      }
};