#!/usr/bin/env python

import rospkg
import sys
import rospkg.common

if len(sys.argv) != 2:
    print("Not Found")
    exit()

package_name = sys.argv[1]

# get an instance of RosPack with the default search paths
rospack = rospkg.RosPack()

# get the file path for rospy_tutorials
try:
    package_path = rospack.get_path(package_name)
    print(package_path)
except rospkg.common.ResourceNotFound as e:
    print("Not found")
