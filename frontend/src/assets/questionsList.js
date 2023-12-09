let allQuestions = [
    {
      "title": "Climbing Stairs",
      "difficulty": "Easy",
      "tags": ["Dynamic Programming"],
      "companies": ["ABC Corp", "XYZ Solutions"],
      "link": "https://leetcode.com/problems/climbing-stairs/"
    },
    {
      "title": "Coin Change",
      "difficulty": "Medium",
      "tags": ["Dynamic Programming"],
      "companies": ["Tech Innovators", "DataCraft"],
      "link": "https://leetcode.com/problems/coin-change/"
    },
    {
      "title": "Longest Increasing Subsequence",
      "difficulty": "Medium",
      "tags": ["Dynamic Programming"],
      "companies": ["Binary Trends", "Algorithm Masters"],
      "link": "https://leetcode.com/problems/longest-increasing-subsequence/"
    },
    {
      "title": "Longest Common Subsequence",
      "difficulty": "Medium",
      "tags": ["Dynamic Programming"],
      "companies": ["Dynamic Soft", "Infinite Code"],
      "link": "https://leetcode.com/problems/longest-common-subsequence/"
    },
    {
      "title": "Word Break Problem",
      "difficulty": "Hard",
      "tags": ["Dynamic Programming"],
      "companies": ["Code Genie", "SoftSprint"],
      "link": "https://leetcode.com/problems/word-break/"
    },
    {
      "title": "Combination Sum",
      "difficulty": "Medium",
      "tags": ["Dynamic Programming"],
      "companies": ["SwiftLogic", "InnovateTech"],
      "link": "https://leetcode.com/problems/combination-sum/"
    },
    {
      "title": "House Robber",
      "difficulty": "Easy",
      "tags": ["Dynamic Programming"],
      "companies": ["TechBuilders", "CodeCrafters"],
      "link": "https://leetcode.com/problems/house-robber/"
    },
    {
      "title": "House Robber II",
      "difficulty": "Medium",
      "tags": ["Dynamic Programming"],
      "companies": ["Algorithm Innovations", "DataForge"],
      "link": "https://leetcode.com/problems/house-robber-ii/"
    },
    {
      "title": "Decode Ways",
      "difficulty": "Hard",
      "tags": ["Dynamic Programming"],
      "companies": ["Agile Minds", "InventiCode"],
      "link": "https://leetcode.com/problems/decode-ways/"
    },
    {
      "title": "Unique Paths",
      "difficulty": "Medium",
      "tags": ["Dynamic Programming"],
      "companies": ["SwiftBit", "BinarySprint"],
      "link": "https://leetcode.com/problems/unique-paths/"
    },
    {
      "title": "Jump Game",
      "difficulty": "Easy",
      "tags": ["Dynamic Programming"],
      "companies": ["Tech Dynamics", "Code Leap"],
      "link": "https://leetcode.com/problems/jump-game/"
    },
    {
        "title": "Two Sum",
        "difficulty": "Easy",
        "tags": ["Arrays", "Hashing"],
        "companies": ["Amazon", "Adobe"],
        "link": "https://leetcode.com/problems/two-sum/"
      },
      {
        "title": "Best Time to Buy and Sell Stock",
        "difficulty": "Easy",
        "tags": ["Arrays", "Dynamic Programming"],
        "companies": ["Apple", "Microsoft"],
        "link": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
      },
      {
        "title": "Contains Duplicate",
        "difficulty": "Easy",
        "tags": ["Arrays", "Hashing"],
        "companies": ["Tesla", "Synopsys", "Google"],
        "link": "https://leetcode.com/problems/contains-duplicate/"
      },
      {
        "title": "Product of Array Except Self",
        "difficulty": "Medium",
        "tags": ["Arrays", "Hashing"],
        "companies": [],
        "link": "https://leetcode.com/problems/product-of-array-except-self/"
      },
      {
        "title": "Maximum Subarray",
        "difficulty": "Easy",
        "tags": ["Arrays", "Dynamic Programming"],
        "companies": ["Facebook", "Microsoft"],
        "link": "https://leetcode.com/problems/maximum-subarray/"
      },
      {
        "title": "Maximum Product Subarray",
        "difficulty": "Medium",
        "tags": ["Arrays", "Dynamic Programming"],
        "companies": ["Amazon", "Apple"],
        "link": "https://leetcode.com/problems/maximum-product-subarray/"
      },
      {
        "title": "Find Minimum in Rotated Sorted Array",
        "difficulty": "Medium",
        "tags": ["Arrays", "Binary Search"],
        "companies": ["Microsoft", "Google"],
        "link": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/"
      },
      {
        "title": "Search in Rotated Sorted Array",
        "difficulty": "Medium",
        "tags": ["Arrays", "Binary Search"],
        "companies": ["Amazon", "Microsoft"],
        "link": "https://leetcode.com/problems/search-in-rotated-sorted-array/"
      },
      {
        "title": "3 Sum",
        "difficulty": "Medium",
        "tags": ["Arrays", "Two Pointers"],
        "companies": ["Meta"],
        "link": "https://leetcode.com/problems/3sum/"
      },
      {
        "title": "Container With Most Water",
        "difficulty": "Medium",
        "tags": ["Arrays", "Two Pointers"],
        "companies": ["Honeywell"],
        "link": "https://leetcode.com/problems/container-with-most-water/"
      },
    {
      "title": "Sum of Two Integers",
      "difficulty": "Medium",
      "tags": ["Binary"],
      "companies": ["Facebook", "Apple"],
      "link": "https://leetcode.com/problems/sum-of-two-integers/"
    },
    {
      "title": "Number of 1 Bits",
      "difficulty": "Easy",
      "tags": ["Binary"],
      "companies": ["Microsoft", "Amazon"],
      "link": "https://leetcode.com/problems/number-of-1-bits/"
    },
    {
      "title": "Counting Bits",
      "difficulty": "Medium",
      "tags": ["Binary"],
      "companies": ["Google", "Facebook"],
      "link": "https://leetcode.com/problems/counting-bits/"
    },
    {
      "title": "Missing Number",
      "difficulty": "Easy",
      "tags": ["Binary"],
      "companies": ["Google", "Microsoft"],
      "link": "https://leetcode.com/problems/missing-number/"
    },
    {
      "title": "Reverse Bits",
      "difficulty": "Easy",
      "tags": ["Binary"],
      "companies": ["Facebook", "Amazon"],
      "link": "https://leetcode.com/problems/reverse-bits/"
    },
    {
      "title": "Clone Graph",
      "difficulty": "Medium",
      "tags": ["Graph"],
      "companies": ["Facebook", "Microsoft"],
      "link": "https://leetcode.com/problems/clone-graph/"
    },
    {
      "title": "Course Schedule",
      "difficulty": "Medium",
      "tags": ["Graph"],
      "companies": ["Amazon", "Google"],
      "link": "https://leetcode.com/problems/course-schedule/"
    },
    {
      "title": "Pacific Atlantic Water Flow",
      "difficulty": "Medium",
      "tags": ["Graph"],
      "companies": ["Google", "Amazon"],
      "link": "https://leetcode.com/problems/pacific-atlantic-water-flow/"
    },
    {
      "title": "Number of Islands",
      "difficulty": "Medium",
      "tags": ["Graph"],
      "companies": ["Amazon", "Facebook"],
      "link": "https://leetcode.com/problems/number-of-islands/"
    },
    {
      "title": "Longest Consecutive Sequence",
      "difficulty": "Medium",
      "tags": ["Graph"],
      "companies": ["Airbnb", "Facebook"],
      "link": "https://leetcode.com/problems/longest-consecutive-sequence/"
    },
    {
      "title": "Alien Dictionary (Leetcode Premium)",
      "difficulty": "Hard",
      "tags": ["Graph"],
      "companies": ["Google", "Facebook"],
      "link": "https://leetcode.com/problems/alien-dictionary/"
    },
    {
      "title": "Graph Valid Tree (Leetcode Premium)",
      "difficulty": "Medium",
      "tags": ["Graph"],
      "companies": ["Google", "Facebook"],
      "link": "https://leetcode.com/problems/graph-valid-tree/"
    },
    {
      "title": "Number of Connected Components in an Undirected Graph (Leetcode Premium)",
      "difficulty": "Medium",
      "tags": ["Graph"],
      "companies": ["Google", "Facebook"],
      "link": "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/"
    },
    {
      "title": "Insert Interval",
      "difficulty": "Hard",
      "tags": ["Interval"],
      "companies": ["Facebook", "Google"],
      "link": "https://leetcode.com/problems/insert-interval/"
    },
    {
      "title": "Merge Intervals",
      "difficulty": "Medium",
      "tags": ["Interval"],
      "companies": ["Amazon", "Microsoft"],
      "link": "https://leetcode.com/problems/merge-intervals/"
    },
    {
      "title": "Non-overlapping Intervals",
      "difficulty": "Medium",
      "tags": ["Interval"],
      "companies": ["Google", "Microsoft"],
      "link": "https://leetcode.com/problems/non-overlapping-intervals/"
    },
    {
      "title": "Meeting Rooms (Leetcode Premium)",
      "difficulty": "Easy",
      "tags": ["Interval"],
      "companies": ["Google", "Facebook"],
      "link": "https://leetcode.com/problems/meeting-rooms/"
    },
    {
      "title": "Meeting Rooms II (Leetcode Premium)",
      "difficulty": "Medium",
      "tags": ["Interval"],
      "companies": ["Google", "Facebook"],
      "link": "https://leetcode.com/problems/meeting-rooms-ii/"
    },
    {
      "title": "Reverse a Linked List",
      "difficulty": "Easy",
      "tags": ["Linked List"],
      "companies": ["Facebook", "Microsoft"],
      "link": "https://leetcode.com/problems/reverse-linked-list/"
    },
    {
      "title": "Detect Cycle in a Linked List",
      "difficulty": "Medium",
      "tags": ["Linked List"],
      "companies": ["Amazon", "Google"],
      "link": "https://leetcode.com/problems/linked-list-cycle/"
    },
    {
      "title": "Merge Two Sorted Lists",
      "difficulty": "Easy",
      "tags": ["Linked List"],
      "companies": ["Microsoft", "Amazon"],
      "link": "https://leetcode.com/problems/merge-two-sorted-lists/"
    },
    {
      "title": "Merge K Sorted Lists",
      "difficulty": "Hard",
      "tags": ["Linked List"],
      "companies": ["Facebook", "Google"],
      "link": "https://leetcode.com/problems/merge-k-sorted-lists/"
    },
    {
      "title": "Remove Nth Node From End Of List",
      "difficulty": "Medium",
      "tags": ["Linked List"],
      "companies": ["Microsoft", "Amazon"],
      "link": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/"
    },
    {
      "title": "Reorder List",
      "difficulty": "Medium",
      "tags": ["Linked List"],
      "companies": ["Amazon", "Microsoft"],
      "link": "https://leetcode.com/problems/reorder-list/"
    },
    {
      "title": "Set Matrix Zeroes",
      "difficulty": "Medium",
      "tags": ["Matrix"],
      "companies": ["Facebook", "Amazon"],
      "link": "https://leetcode.com/problems/set-matrix-zeroes/"
    },
    {
      "title": "Spiral Matrix",
      "difficulty": "Medium",
      "tags": ["Matrix"],
      "companies": ["Microsoft", "Amazon"],
      "link": "https://leetcode.com/problems/spiral-matrix/"
    },
    {
      "title": "Rotate Image",
      "difficulty": "Medium",
      "tags": ["Matrix"],
      "companies": ["Facebook", "Microsoft"],
      "link": "https://leetcode.com/problems/rotate-image/"
    },
    {
      "title": "Word Search",
      "difficulty": "Medium",
      "tags": ["Matrix"],
      "companies": ["Microsoft", "Facebook"],
      "link": "https://leetcode.com/problems/word-search/"
    },
    {
      "title": "Longest Substring Without Repeating Characters",
      "difficulty": "Medium",
      "tags": ["String"],
      "companies": ["Amazon", "Microsoft"],
      "link": "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
    },
    {
      "title": "Longest Repeating Character Replacement",
      "difficulty": "Medium",
      "tags": ["String"],
      "companies": ["Amazon", "Google"],
      "link": "https://leetcode.com/problems/longest-repeating-character-replacement/"
    },
    {
      "title": "Minimum Window Substring",
      "difficulty": "Hard",
      "tags": ["String"],
      "companies": ["Facebook", "Amazon"],
      "link": "https://leetcode.com/problems/minimum-window-substring/"
    },
    {
      "title": "Valid Anagram",
      "difficulty": "Easy",
      "tags": ["String"],
      "companies": ["Microsoft", "Amazon"],
      "link": "https://leetcode.com/problems/valid-anagram/"
    },
    {
      "title": "Group Anagrams",
      "difficulty": "Medium",
      "tags": ["String"],
      "companies": ["Yandex", "Microsoft", "Google"],
      "link": "https://leetcode.com/problems/group-anagrams/"
    },
    {
      "title": "Valid Parentheses",
      "difficulty": "Medium",
      "tags": ["String", "Stack"],
      "link": "https://leetcode.com/problems/valid-parentheses/"
    },
    {
      "title": "Valid Palindrome",
      "difficulty": "Easy",
      "tags": ["String", "Two Pointers"],
      "link": "https://leetcode.com/problems/valid-palindrome/"
    },
    {
      "title": "Longest Palindromic Substring",
      "difficulty": "Medium",
      "tags": ["String", "Dynamic Programming"],
      "link": "https://leetcode.com/problems/longest-palindromic-substring/"
    },
    {
      "title": "Palindromic Substrings",
      "difficulty": "Medium",
      "tags": ["String", "Dynamic Programming"],
      "link": "https://leetcode.com/problems/palindromic-substrings/"
    },
    {
      "title": "Encode and Decode Strings (Leetcode Premium)",
      "difficulty": "Medium",
      "tags": ["String"],
      "link": "https://leetcode.com/problems/encode-and-decode-strings/"
    },
    {
      "title": "Maximum Depth of Binary Tree",
      "difficulty": "Easy",
      "tags": ["Tree"],
      "companies": ["Amazon", "Microsoft"],
      "link": "https://leetcode.com/problems/maximum-depth-of-binary-tree/"
    },
    {
      "title": "Same Tree",
      "difficulty": "Easy",
      "tags": ["Tree"],
      "companies": ["Microsoft", "Amazon"],
      "link": "https://leetcode.com/problems/same-tree/"
    },
    {
      "title": "Invert/Flip Binary Tree",
      "difficulty": "Easy",
      "tags": ["Tree"],
      "companies": ["Google", "Microsoft"],
      "link": "https://leetcode.com/problems/invert-binary-tree/"
    },
    {
      "title": "Binary Tree Maximum Path Sum",
      "difficulty": "Hard",
      "tags": ["Tree"],
      "companies": ["Facebook", "Amazon"],
      "link": "https://leetcode.com/problems/binary-tree-maximum-path-sum/"
    },
    {
      "title": "Binary Tree Level Order Traversal",
      "difficulty": "Medium",
      "tags": ["Tree"],
      "companies": ["Amazon", "Microsoft"],
      "link": "https://leetcode.com/problems/binary-tree-level-order-traversal/"
    },
    {
      "title": "Serialize and Deserialize Binary Tree",
      "difficulty": "Hard",
      "tags": ["Tree"],
      "companies": ["Facebook", "Amazon"],
      "link": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/"
    },
    {
      "title": "Subtree of Another Tree",
      "difficulty": "Medium",
    "tags": ["Tree"],
    "companies": ["Amazon", "Microsoft"],
    "link": "https://leetcode.com/problems/subtree-of-another-tree/"
  },
  {
    "title": "Construct Binary Tree from Preorder and Inorder Traversal",
    "difficulty": "Medium",
    "tags": ["Tree"],
    "companies": ["Amazon", "Microsoft"],
    "link": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/"
  },
  {
    "title": "Validate Binary Search Tree",
    "difficulty": "Medium",
    "tags": ["Tree"],
    "companies": ["Amazon", "Microsoft"],
    "link": "https://leetcode.com/problems/validate-binary-search-tree/"
  },
  {
    "title": "Kth Smallest Element in a BST",
    "difficulty": "Medium",
    "tags": ["Tree"],
    "companies": ["Amazon", "Microsoft"],
    "link": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/"
  },
  {
    "title": "Lowest Common Ancestor of BST",
    "difficulty": "Easy",
    "tags": ["Tree"],
    "companies": ["Amazon", "Microsoft"],
    "link": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/"
  },
  {
    "title": "Implement Trie (Prefix Tree)",
    "difficulty": "Medium",
    "tags": ["Tree", "Trie"],
    "companies": ["Amazon", "Microsoft"],
    "link": "https://leetcode.com/problems/implement-trie-prefix-tree/"
  },
  {
    "title": "Add and Search Word",
    "difficulty": "Medium",
    "tags": ["Tree", "Trie"],
    "companies": ["Amazon", "Microsoft"],
    "link": "https://leetcode.com/problems/add-and-search-word-data-structure-design/"
  },
  {
    "title": "Word Search II",
    "difficulty": "Hard",
    "tags": ["Backtracking", "Trie"],
    "companies": ["Amazon", "Microsoft"],
    "link": "https://leetcode.com/problems/word-search-ii/"
  },
  {
    "title": "Top K Frequent Elements",
    "difficulty": "Medium",
    "tags": ["Heap"],
    "companies": ["Amazon", "Microsoft"],
    "link": "https://leetcode.com/problems/top-k-frequent-elements/"
  },
  {
        "title": "Find Median from Data Stream",
        "difficulty": "Hard",
        "tags": ["Heap", "Design"],
        "companies": ["Amazon", "Microsoft"],
        "link": "https://leetcode.com/problems/find-median-from-data-stream/"
}
    ]

export default allQuestions;
      